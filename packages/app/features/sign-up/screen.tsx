import { YStack } from '@t4/ui'
import { useSignUp } from 'app/utils/clerk'
import { OAuthStrategy } from '@clerk/types'
import { useRouter } from 'solito/router'
import { SignUpSignInComponent } from '@t4/ui/src/SignUpSignIn'

export const SignUpScreen = (): React.ReactNode => {
  const { push } = useRouter()

  const { isLoaded, signUp, setSession } = useSignUp()

  if (!setSession || !isLoaded) return null

  const handleOAuthSignUpWithPress = async (strategy: OAuthStrategy) => {
    if (process.env.TAMAGUI_TARGET === 'web') {
      push('/sign-up/sso-oauth/' + strategy)
    } else {
      push('/sso-oauth/' + strategy)
    }
  }

  const handleEmailSignUpWithPress = async (emailAddress, password) => {
    await signUp.create({
      emailAddress,
      password,
    })

    await signUp.prepareEmailAddressVerification()
    if (process.env.TAMAGUI_TARGET === 'web') {
      push('/sign-up/email-verification')
    } else {
      push('/email-verification')
    }
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" space>
      <SignUpSignInComponent
        type="sign-up"
        handleOAuthWithPress={handleOAuthSignUpWithPress}
        handleEmailWithPress={handleEmailSignUpWithPress}
      />
    </YStack>
  )
}
