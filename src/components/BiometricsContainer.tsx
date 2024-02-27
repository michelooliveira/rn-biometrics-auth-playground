import { useCallback, useContext, useMemo, useState } from "react"
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TextInputChangeEventData, View, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { BiometricsContext } from "../states/BiometricsState";
import EncryptedStorage from 'react-native-encrypted-storage';
import { handleFakeApiCall } from "../services/api"


const BiometricsContainer = () => {
    const isDarkMode = useColorScheme() === 'dark'
    const { biometricsInfo, biometrics } = useContext(BiometricsContext)

    const backgroundStyle = useMemo(() => ({
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }),[])
    const [storedUserMatches, setStoredUserMatches] = useState(false)


    const [username, setUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [isBiometricAuthEnabled, setIsBiometricAuthEnabled] = useState(false);

    const getStoredUser = useCallback(async () => {
        const storedUser = await EncryptedStorage.getItem('storedUser')
        if(storedUser){
            return JSON.parse(storedUser)
        }
    },[])

    const resetForm = useCallback(() => {
        Alert.alert('Sucesso!')
        setUserPassword('')
        setUsername('')
        setIsBiometricAuthEnabled(false)
    },[])

    const getUserBiometrics = async () => biometrics?.simplePrompt({
            promptMessage: 'Realize a autenticação biométrica',
            fallbackPromptMessage: 'Impossível obter autenticação biométrica. Entre com sua senha.'
        })
    

    const handleLogin = useCallback(async () => {
        try {
            // Tenta acessar API
            // Deu certo
            await handleFakeApiCall()
            if(!storedUserMatches && isBiometricAuthEnabled){
                await getUserBiometrics()
                await EncryptedStorage.setItem('storedUser', JSON.stringify({username, userPassword}))
            }
            // faz o resto
            resetForm() // Como se tivesse seguido com a autenticação
        } catch (error) {
            if(storedUserMatches) {
                await EncryptedStorage.removeItem('storedUser')
                Alert.alert('Sua senha foi atualizada')
            } else {
                throw new Error('Ocorreu um erro ao logar.')
            }
            
            return
        }
    },[username, userPassword, isBiometricAuthEnabled, storedUserMatches])

    const toggleSwitch = async (value: boolean) => {
        // console.log('Call', {username, userPassword})
        if(!username.length || !userPassword.length) return

        const storedUser = await getStoredUser()
        if(storedUser) {
            if(storedUser.username !== username){
                Alert.alert('Outro usuário já usa autenticação biométrica')
            }
        }
        setIsBiometricAuthEnabled(() => value)
        
    };

    const handleBiometricsAuth = useCallback(async () => {
        try {
            if(!username.length) return
            const storedUser = await getStoredUser()
            if(storedUser) {
                if(storedUser.username === username){
                    await getUserBiometrics()
                    setStoredUserMatches(true)
                    setUserPassword(storedUser.password)
                    return handleLogin()
                }
            }    
        } catch(err) {
            Alert.alert('Erro ao realizar autenticação biométrica')
        }      
    },[username])

    return <SafeAreaView style={backgroundStyle}>
            <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={styles.scrollview}>            
                
            <View style={styles.viewStyle}>
            <Text>User</Text>
            <TextInput
                value={username}
                style={styles.textInput}
                onChangeText={(text: string) => {
                    setUsername(text)
                    setStoredUserMatches(false)
                    setIsBiometricAuthEnabled(false)
                }}
                />
            <Text>Password</Text>
            <TextInput
                value={userPassword}
                style={styles.textInput}
                onChangeText={(text: string) => setUserPassword(text)}
                onFocus={handleBiometricsAuth}
                secureTextEntry={true}
            />  

                <Pressable
                style={styles.pressable}
                hitSlop={10}
                onPress={handleLogin}>
                <Text style={styles.clickHereButton}>Autenticar</Text>
                </Pressable>
                {biometricsInfo?.available && <View style={styles.container}>
                    <Switch
                        disabled={!username?.length || !userPassword?.length}
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isBiometricAuthEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isBiometricAuthEnabled}
                    />
                </View>}
            </View>
            
            </ScrollView>
        </SafeAreaView>
}



const styles = StyleSheet.create({
    scrollview: {
      display: 'flex',
      padding: '10%',
      backgroundColor: '#066f98',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    pressable: {
      backgroundColor: 'gray',
      padding: '5%',
      width: '100%',
      height: 70,
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    clickHereButton: {
      fontSize: 30,
      color: 'white',
    },
    viewStyle: {    
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
        height: 50, 
        width: '100%', 
        backgroundColor: 'white',
        marginTop: 0,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10
    },
    container: {
        width: '100%',
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
})

export default BiometricsContainer