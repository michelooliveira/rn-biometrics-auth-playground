import { createContext, useCallback, useEffect, useState } from "react"
import ReactNativeBiometrics from "react-native-biometrics";


export const BiometricsContext = createContext<any>({})

const reactNativeBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })


const BiometricsState: React.FC<any> = ({children}) => {

    const [biometricsInfo, setBiometricsInfo] = useState<any>(undefined)    

    useEffect(() => {
        const getBiometricsInfo = async () => {
            try {
                const { available, biometryType } = await reactNativeBiometrics.isSensorAvailable()
                setBiometricsInfo({ available, biometryType })
                reactNativeBiometrics.createKeys()
            } catch (error) {
                console.error({error})
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

