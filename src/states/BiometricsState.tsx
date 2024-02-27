import { createContext, useCallback, useEffect, useState } from "react"
import ReactNativeBiometrics, { BiometryType } from "react-native-biometrics";

type BiometricsContext = { 
    biometrics?: ReactNativeBiometrics, 
    biometricsInfo: { 
        biometryType?: BiometryType, 
        available: boolean
    }
}

export const BiometricsContext = createContext<BiometricsContext>({
    biometrics: undefined,
    biometricsInfo: {
        biometryType: undefined,
        available: false
    }
})

const reactNativeBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })


const BiometricsState: React.FC<any> = ({children}) => {

    const [biometricsInfo, setBiometricsInfo] = useState<any>(undefined)    

    useEffect(() => {
        const getBiometricsInfo = async () => {
            try {
                const { available, biometryType } = await reactNativeBiometrics.isSensorAvailable()
                console.log({available, biometryType})
                if(available) {
                    await reactNativeBiometrics.createKeys() // Quando não tem mais biometria cadastrada, esse cara dá o erro abaixo.
                    /** 
                     *  ERROR  {"nativeStackAndroid":[],"userInfo":null,"message":"Error generating public private keys","code":"Error generating public private keys: java.lang.IllegalStateException: At least one biometric must be enrolled to create keys requiring user authentication for every use"}
                    */

                    setBiometricsInfo({ available, biometryType })
                }
            } catch (error: any) {
                console.error(JSON.stringify(error))

            }
          }
          getBiometricsInfo()
    },[])
    return <BiometricsContext.Provider value={{
        biometricsInfo,
        biometrics: reactNativeBiometrics,
    }}>{children}</BiometricsContext.Provider>
}

export default BiometricsState

