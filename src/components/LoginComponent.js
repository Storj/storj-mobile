import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ScrollView,
    Platform
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputComponent from '../components/InputComponent';
import { getWidth, getHeight } from '../utils/adaptive';

/**
 * LoginScreen component
 */
export default class LoginComponent extends Component {
	constructor(props) {
        super(props);

        this.onSubmit = props.onSubmit ? props.onSubmit : () => {};
        this.redirectToQRScannerScreen = props.redirectToQRScannerScreen ? props.redirectToQRScannerScreen : () => {};
        this.onChangeLogin = props.onChangeLogin ? props.onChangeLogin : () => {};
        this.onChangePassword = props.onChangePassword ? props.onChangePassword : () => {};
        this.onChangeMnemonic = props.onChangeMnemonic ? props.onChangeMnemonic : () => {};
        this.registerButtonOnPress = props.registerButtonOnPress ? props.registerButtonOnPress : () => {};
    };

	render() {
		return(
			<ScrollView style={ styles.mainContainer } keyboardDismissMode = { Platform.OS === "ios" ? "on-drag" : "none" } keyboardShouldPersistTaps = { 'always' } >
                <View style={ styles.contentWrapper }>
                    <Text style = { styles.titleBold }>Sign in</Text>
                    <View style = { styles.inputsMargin } >
                        <InputComponent 
                            style = { styles.inputHeight }
                            onChangeText = { this.onChangeLogin }
                            isPassword = { false } 
                            placeholder = {'your_email@mail.com'} 
                            value = { this.props.email }
                            isError = { this.props.isEmailError }
                            errorMessage = { 'Invalid Email' }
                            regularMessage = { 'Email' } />
                        <InputComponent 
                            style = { styles.inputHeight }
                            onChangeText = { this.onChangePassword } 
                            isPassword = { true } 
                            placeholder = {'Enter your password'}
                            value = { this.props.password }
                            isError = { this.props.isPasswordError }
                            errorMessage = { 'Invalid password' }
                            regularMessage = { 'Password' } />
                        <View style = { styles.agreementWrapper } >
                            <TouchableOpacity onPress = { this.props.redirectToForgotPassword }>
                                <Text style = { styles.agreementText }>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        <InputComponent 
                            style = { styles.mnemonicContainer }
                            inputStyle = { styles.mnemonicInput }
                            multiline = { true }
                            placeholder = {'Please enter your secret phrase (secret phrase that you generated while registred in Storj befores) or scan your log in credentials via QR code'}
                            onChangeText = { this.onChangeMnemonic } 
                            editable = { !this.props.isRedirectedFromRegister}
                            isPassword = { true }  
                            value = { this.props.mnemonic }
                            isError = { this.props.isMnemonicError }
                            errorMessage = { 'Invalid secret phrase' }
                            regularMessage = { 'Secret phrase' } />
                        <View style = { styles.agreementWrapper }>
                            <TouchableOpacity onPress = { this.props.redirectToMnemonicHelpScreen } >
                                <Text style = { styles.mnemonicInfoLinkText }>Need help with your secret phrase?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style = { styles.footer }>
                    <TouchableOpacity style = { styles.createAccountButton } onPressOut = { this.onSubmit }>
                        <Text style = { styles.createAccountText }>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { styles.loginViaQRButton } onPressOut = { this.redirectToQRScannerScreen }> 
                        <Text style = { styles.loginViaQRText }>Login via QR code</Text>
                    </TouchableOpacity>
                    <Text style = { styles.footerText }>Don't have an account? <Text onPress = { this.registerButtonOnPress } style = { styles.footerLink }>Sign Up</Text></Text>              
                </View>
                {
                    this.props.isLoading ?
                        <View style = { [ styles.backgroundWrapper, styles.setChildCenter ] }>
                            <ActivityIndicator animating = { true } color = { "#2782ff" } size = { "large" }/>
                        </View>
                         : null
                }
			</ScrollView>
		);
	};
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    backgroundWrapper: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    dimBlack: {
        backgroundColor: 'black',
        opacity: 0.3
    },
    contentWrapper: {
        marginTop: getHeight(30),
        paddingLeft: getWidth(20),
        paddingRight: getWidth(20)
    },
    setChildCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        height: getHeight(56),
        width: getWidth(120),
        top: getHeight(20),
        left: getWidth(20)
    },
    titleBold: {
        fontFamily: 'montserrat_extrabold',
        fontSize: getHeight(30),
        color: '#384B65',
        marginBottom: getHeight(5)
    },
    mnemonicContainer: {
        height: getHeight(90), 
        marginTop: getHeight(20)
    },
    mnemonicInput: {
        height: getHeight(80),
        fontSize: getHeight(14)
    },
    inputHeight: {
        marginTop: getHeight(20),
        height: getHeight(50)
    },
    mnemonicPlaceholderText: {
        fontSize: getHeight(12),
        marginTop: getHeight(21),
        color: '#4b657d',
        opacity: 0.4,
        fontFamily: 'montserrat_regular',
        fontWeight: 'bold'
    },
    mnemonicInfoLinkText: {
        fontSize: getHeight(13),
        color: '#2794FF',
        alignSelf: 'flex-end',
        fontFamily: 'montserrat_regular',
        fontWeight: 'bold',
        marginBottom: getHeight(24)
    },
    footer: {
        marginTop: getHeight(10),
        alignItems: 'center'
    },
    createAccountButton: {
        width: getWidth(343),
        height: getHeight(50),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2794FF',
        borderRadius: getWidth(6)
    },
    loginViaQRButton: {
        marginTop: getHeight(10),
        width: getWidth(343),
        height: getHeight(50),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: getWidth(6),
        borderColor: '#2794FF',
        borderWidth: getWidth(1)
    },
    loginViaQRText: {
        fontFamily: 'montserrat_bold',
        fontSize: getHeight(16),
        color: '#2794FF'
    },
    createAccountText: {
        fontFamily: 'montserrat_bold',
        fontSize: getHeight(16),
        color: 'white'
    },
    footerText: {
        fontFamily: 'montserrat_regular',
        fontSize: getHeight(16),
        color: '#384B65',
        marginTop: getHeight(15)
     },
    footerLink: {
        fontFamily: 'montserrat_bold',
        color: '#2794FF'
    },
    agreementWrapper: {
        marginTop: getHeight(10),
        justifyContent: 'flex-end'
    },
    agreementText: {
        marginTop: getHeight(20),
        lineHeight: getHeight(24),
        alignSelf: 'flex-end',
        fontSize: getHeight(16),
        color: '#2794FF',
        fontFamily: 'montserrat_bold'
    },
    inputsMargin: {
        marginTop: getHeight(35)
    }
});

/**
 * Checking RegisterComponent correct prop types
 */
LoginComponent.propTypes = {
    onSubmit: PropTypes.func,
    onChangeLogin: PropTypes.func,
    onChangePassword: PropTypes.func,
    registerButtonOnPress: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    mnemonic: PropTypes.string,
    isEmailError: PropTypes.bool,
    isPasswordError: PropTypes.bool,
    isMnemonicError: PropTypes.bool,
    isRedirectedFromRegister: PropTypes.bool
};
