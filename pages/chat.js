import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import React from 'react';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/BtnSendSticker';

// SUPABASE CONFIG
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4OTY2NSwiZXhwIjoxOTU4ODY1NjY1fQ._xW6Viehvlc4RZ5RLlvb7mFZCbZVLrwJHLieHG7P-Aw'
const SUPABASE_URL = 'https://grprtzicgtatjigqkdrj.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function EscutaMensagensEmTempoReal(adicionaMsg) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', ( RespLive ) => {
            adicionaMsg(RespLive.new)
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    console.log(roteamento.query);
    console.log('usuario logado:', usuarioLogado);
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagens, setListaMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta:', data)
                setListaMensagens(data)
            });

            EscutaMensagensEmTempoReal((novaMensagem) => {
                console.log('nova msg:', novaMensagem)
                setListaMensagens((valorAtualDaLista) => {
                    return [
                        novaMensagem,
                        ...valorAtualDaLista,
                    ]
                });
            })
    }, [])



    /* 
    // Usuário
    - Usuário digita no campo text-area
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
        
    // Dev
    - [x] Campo criado
    - [x] Usar o onChange e setState (ter if para caso seja enter, pra limpar a variavel)
    - [ ] Lista de mensagens
        
    */

    function handleNewMessage(novaMensagem) {
        if (novaMensagem.length === 0) return
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,
        };
        //Chamada de um back-end
        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando Msg:', data)
            });

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[100],
                backgroundImage: `url(https://images.pexels.com/photos/3289880/pexels-photo-3289880.jpeg?cs=srgb&dl=pexels-andre-moura-3289880.jpg&fm=jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
                overflow: 'hidden'

            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    overflow: 'hidden'
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[400],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                        overflow: 'hidden'
                    }}
                >
                    <MessageList mensagens={listaMensagens} />
                    {/* {listaMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    }
                    )} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);

                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();

                                    handleNewMessage(mensagem);
                                    setMensagem('')
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[100],
                                overflow: 'hidden'
                            }}
                        />
                        <Button styleSheet={{
                            backgroundColor: 'green', color: 'white', height: '50px', width: '60px', display: 'flex',
                            marginBottom: '10px'
                        }}
                            label="Enviar" onClick={() => {
                                handleNewMessage(mensagem);
                                setMensagem('');
                            }}></Button>
                    </Box>
                    {/* CALLBACK */}
                    <ButtonSendSticker
                        onStickerClick={(sticker) => {
                            console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker)
                            handleNewMessage(':sticker:' + sticker)
                            
                        }}
                    />
                </Box>
            </Box>
        </Box >
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                overflowX: 'hidden',
                overflowWrap: 'anywhere',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[200],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    hover: {
                                        width: '60px', height: '60px'
                                    }
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong" styleSheet={{ fontSize: '15px', color: 'skyblue' }}>
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ? <Image styleSheet={{maxWidth: '200px', maxHeight: '200px'}} src={mensagem.texto.replace(':sticker:', '')} /> : (mensagem.texto)}

                        {/*mensagem.texto*/}
                    </Text>
                );
            })}

        </Box>
    )
}