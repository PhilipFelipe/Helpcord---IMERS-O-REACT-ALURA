// COMPONENTE REACT!
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.primary[600]};
                    font-size: 24px;
                    font-weight: 600;
                }
                `}</style>
        </>
    );
}

/* function HomePage() {
    // JSX
    return (
        <div>
            <GlobalStyle />
            <Title tag="h2">Boas vindas</Title>
            <h2>Discord - felipe</h2>
        </div>
    )
};

export default HomePage */

export default function PaginaInicial() {
    //const username = 'PhilipFelipe';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [validate, setValidate] = React.useState('none');

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[100],
                    backgroundImage: 'url(https://images.pexels.com/photos/6646941/pexels-photo-6646941.jpeg?cs=srgb&dl=pexels-rodnae-productions-6646941.jpg&fm=jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 5px 1px rgb(120, 226, 161)',
                        backgroundColor: appConfig.theme.colors.neutrals[100],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault()
                            roteamento.push('/chat');
                            //window.location.href = '/chat';
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Boas vindas ao Helpcord!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['050'] }}>
                            {appConfig.name}
                        </Text>

                        {/* <input type="text" value={username} onChange={function(event) {
                            console.log('usuario digitou', event.target.value)
                            //ONDE ESTÁ O VALOR?
                            const value = event.target.value;
                            //TROCAR A VARIÁVEL
                            setUsername(value);

                        }}
                        /> */}
                        <TextField value={username} onChange={function (event) {
                            const value = event.target.value
                            setUsername(value);
                            if (value.length > 2) {
                                setValidate('block');
                            } else {
                                setValidate('none');
                            }
                        }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[100],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[100],
                                    backgroundColor: appConfig.theme.colors.neutrals[200],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            styleSheet={{
                                display: `${validate}`
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[700],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[200],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[800],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                            boxShadow: '2px 2px 8px 1px #221c1c'
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                                display: `${validate}`
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[100],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}