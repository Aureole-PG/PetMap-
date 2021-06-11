import styled from 'styled-components'
export const WindowsHeight = styled.div`
    height: 100vh;
`; 
export const Row = styled.div`
    margin-left: auto;
    margin-right: auto;
    box-sizing: inherit;
    ::after{
        display: block;
    }
    
`;
export const Paralax = styled.div`
  background-image: url("https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_noticia__small/public/noticias/mascotas-preferidas-espanoles.jpg");
  min-height: 500px; 
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

`;