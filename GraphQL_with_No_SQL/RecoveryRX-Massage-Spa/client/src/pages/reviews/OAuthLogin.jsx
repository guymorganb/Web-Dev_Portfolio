import { useMemo, useState } from 'react';
import { Link, Stack, Text, VStack } from '@chakra-ui/react';
import { GoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';
import decode from 'jwt-decode'
// If you're not using the CodeBlock component or the constant `code`, you can remove them.

export default function SignInFlows() {
  const [credentialResponse, setCredentialResponse] = useState(null);

  async function fetchGoogleUserInfo(accessToken) {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User Info:", data);
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

function handleSuccess(credentialResponse) {
    console.log('credentials',credentialResponse);
    setCredentialResponse(credentialResponse.credential)
    const hasAccess = hasGrantedAllScopesGoogle(
      credentialResponse.token,
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/business.manage',
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/devstorage.full_control',
      'https://www.googleapis.com/auth/devstorage.read_write',
      'https://www.googleapis.com/auth/logging.read'
    );
    if (hasAccess) {
        fetchGoogleUserInfo(credentialResponse.credential); // Fetch user info if scopes are granted
      }
    else{
        console.log("user has not granted access")
    }
    }
  return (
    <VStack spacing="5">

       
      <Stack direction={['column', 'column', 'row']} align="center" spacing="2" py={2} onClick={()=>console.log(window.location.href)}>
     
        <GoogleLogin
        theme="filled_black"
        shape="pill"
        scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/business.manage https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/devstorage.full_control https://www.googleapis.com/auth/devstorage.read_write https://www.googleapis.com/auth/logging.read"
        onSuccess={handleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
       
      </Stack>

    </VStack>
  );
}


//     // implement a use effect to send

//   // decode the JWT google sends back to get the approved scopes
//   const user = useMemo(() => {
//     if (!credentialResponse?.credential){
//       return;
//     }   
//     console.log("decoded", credentialResponse.credential) 
    
//     return decode(credentialResponse.credential);
//   }, [credentialResponse]);

//   const fetchGoogleUserInfo = async (accessToken) => {
//     // Fetch user's email
//     fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("User Info:", data);
//     })
//     .catch(error => console.error('Error:', error));
// }