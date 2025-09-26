import { mailtrapClient, sender } from "./mailtrapConfig.js"
import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) =>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log("Email sent sucessfully", response)
    } catch (error) {
        console.error("Error sending verification", error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async ( email, name) =>{
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "932c2d11-636a-47b2-aa42-ee942a373396",
            template_variables:{
                company_info_name: "Permutas Online",
                name: name,
            }
        });

        console.log("Welcome email sent sucessfully", response);
    }catch(error){
        console.error("Error sending Welcome email", error);
        throw new Error(`Error sending Welcome email: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) =>{
    const recipient = [{email}];

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset"
        });
        console.log("Password Reset email sent sucessfully", response);
    }catch(error){
        console.error("Error sending password reset email", error);
        throw new Error(`Error sending password reset email: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset Sucessful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        })

        console.log("Password reset email sent sucessfully", response)
    } catch (error) {
        console.error("Error sending reset sucess email", error);
        throw new Error(`Error sending reset sucess email: ${error}`)
    }
}