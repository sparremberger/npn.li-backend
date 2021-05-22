import isValidUrl from './UrlValidator';
import URL from './URL';

// UrlShortener recebe uma string, valida com o UrlValidator e, caso válida, cria e retorna um novo objeto URL
function UrlShortener(url : string) { 
    //if (isValidUrl(url)) {
        const shortenedLink : URL = new URL(url, 'none');
        return shortenedLink;
    //}
    //return null;
}

export default UrlShortener;