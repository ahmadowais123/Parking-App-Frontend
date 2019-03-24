import React,{Component} from "react";
import Calendar from 'react-calendar';
import swal from 'sweetalert';
import axios from 'axios';

export default class Browse extends Component{

    state = {
        loading: false,
        spot: [],
        startDate: null,
        endDate: null
    };


    checkDates() {
        console.log(this.state.startDate);
        console.log(this.state.endDate);
        if(this.state.startDate && this.state.endDate) {
            if(this.state.startDate.getTime() < this.state.endDate.getTime())
            return true;
        } else {
            return false;
        }
    }

    onChange = (startDate) => {
        this.setState({startDate});
    };

    onChangeEnd = (endDate) => {
        this.setState({endDate});
    };


    //changes appropriate state variables for whatever is typed into the fields
    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    };


    formatDate = (date) => {
        var date2 = date.toISOString().substr(0, 19).replace('T', ' ');
        return date2;
    };


    displayAds = (event) => {
           let url = "https://parking-system-ecse428.herokuapp.com/spot/getFreeSpots";
           var startDate = this.formatDate(this.state.startDate);
           var endDate = this.formatDate(this.state.endDate);
           url += "?startDate=" + startDate + "&endDate=" + endDate;

           axios.get(url).then((response) => {
               this.setState({spot: response.data});
               console.log(response);
           });
    };

    filterStreet = (event) => {
               swal({
                 text: 'Search for a parking spot by entering a street name (case sensitive!)',
                 content: "input",
                 button: {
                   text: "Search!",
                   closeModal: false,
                 },
               })
               .then(street => {
                 if (!street) throw null;
                let url = "https://parking-system-ecse428.herokuapp.com/spot//partialSearch/streetName/" + street;
                axios.get(url).then((response) => {
                     this.setState({spot: response.data});
                     console.log(response);
                       swal({
                         title: "Top result:",
                         text: "Address: " + response.data[0].street_Number + " " + response.data[0].street_Name + "\n" + "Postal Code: " + response.data[0].postal_Code,
                         icon: "data:image/jpeg;base64,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",
                       });
                 })
                 .catch(err => {
                   if (err) {
                     swal("Oh noes!", "No parking spot available on " + street, "error");
                   } else {
                     swal.stopLoading();
                     swal.close();
                   }
                 })
                 })
    };

    filterPostal = (event) => {
                   swal({
                     text: 'Search for a parking spot by entering a postal code (case sensitive!)',
                     content: "input",
                     button: {
                       text: "Search!",
                       closeModal: false,
                     },
                   })
                   .then(code => {
                     if (!code) throw null;
                    let url = "https://parking-system-ecse428.herokuapp.com/spot//partialSearch/postalCode/" + code;
                    axios.get(url).then((response) => {
                         this.setState({spot: response.data});
                         console.log(response);
                           swal({
                             title: "Top result:",
                             text: "Address: " + response.data[0].street_Number + " " + response.data[0].street_Name + "\n" + "Postal Code: " + response.data[0].postal_Code,
                             icon: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUXFx0aGBcYFx4ZGRofFxoYFxoXHRgaHSggGxolGxkaITEhJyktLi4uGh8zODMtNygtLisBCgoKDg0OGhAQGy8lHR4wLS0rLS0vKystLS0tLSstLSstLS0vLS0rLS0rKystLS0tLSstLS0rLS0tLi0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAQMEBQYABwj/xABAEAABAgMGAggEAwcEAgMAAAABAhEAAyEEBRIxQVFhcQYTIjKBkaHwscHR4UJS8QcUI2JygpIVorLSQ8IkM1P/xAAbAQEBAQEBAQEBAAAAAAAAAAAAAQIDBAUGB//EAC8RAAICAQMCAwcDBQAAAAAAAAABAhEDEiExBFETQZEFFTJhceHwIoGhFCNSsdH/2gAMAwEAAhEDEQA/AOX07QkNKSVcTQfWKu39PbWEjD1YxEuSlyOAq2XDeKtNw2gseqI/qUhP/JQh9fRK0zEsEAVfPFw/8YVoY7y3RzQvRO/1/vZM2YSmccKydCpmXsGUEnLINEPpvdvU2kqZkzHUzZKBaYB/dXkoRYWf9ntsLUDbBKn/AN4QPWNVfHRi0WqUhEyUQpOElZWlLqCcKj2QsdrNuAjios0eWy0KAxMoBnyIcPhxA5FiRrHqV12hNusJRMqopIPBSWxebhf9/CK+X+zUAMueED8pmYh5JCTGhue5JFldp4LlyEpLOHr2iWoojPJthCio8VtctUtapZHaSog021iTc94dROQvTJYUeypKqKBDUDH5x6lb+jtjVMMw41FQD0RWjOMSC1IWTctlGUnzIT/wCYbCmefX6gWacUgdgkTEF+8lTM6WqX21GkCqZjSyj2h3K5AggtuDSgYHPhGy6VhIQghAUykoAAxZuEupVc9X3PEUdosqSVy0S1JUFO4dwpsSpTvhP5gz0YB84+dlwpW0YePsVC0oUrD2gS7urClyxZqljQcXh6Sf4ZTMrVjUKDgDzBaoeoJETU9F7TMST1K1JALOMOTDWrkDJni0mdFLQ6kIQUBbuRMwpZiycCThNUgvxU+ceXxI8FWNmOtElaSUKcBJAxCuLPCFFQqAGZ2Z2LZxOKjhGCVhURiSqjrGKqgU1wvxo+ecSp9hnSlTErQpYIUlQwHCXJKcg3eCFBtTEmRNWuWiVMR2kf1JIxKDjtZEdlqUKQ9KxttNWYca5KArIS5xJZ+8CCQqrEGoJT+LlU1idIu9alSpiUg4wtQAoFJxAKwnECTmWzDZNEq1sSSuS8wD8VVFJSxqnVDBn3NNIe/1BC+rSkFICq9ouXIUl0uQliDlnTd4KSCSXIz0sCk2ueerbDOUcTdknGpiqrEAEB9AcnEQcSlHDMTiUQKAEOpnAcgVIbTU7xpb5tE1Vrmjq1KQmdNTTIBSyTkM1ebAc4gXggTZnWBCwknDUO+jBYDKVyJqDtRkmtTLNK9rKGWtNU4CFJBSUqKirEmhAL9niMjWo1kJnunPKZQMC2OuEbnskOH01ys7ulBMxRY4kq7JbtBklDhidyTm+0QptlVIVhKSjF2QFABy7JUCrJiUjE/xjOuMnsZ03wMzrYUhSUFSXYOlTEALOjuzF8qMc4aFpSSlNSsE9qgfNgGYMWpTxBoLa77IFFLp6xKWLBKlFNO6WrsODCrROttlswCSpCiAzAVcqqzZFq+WeUbjFceZpY2ygQFJJQSogpcCvN2GuIKD+sRcE0BKAABiqh1AOpThK0k1IKc+QfKNHNXJlEYpRQ9NQeyRQOC5AJOxdtoVaLMsYyjC5zUVHEQzK31NRQlRqM43GO3KL4dFFY1rVMSRgqpsQOZSMiA1VJcV4VpAyreQyylyV1r2SMSS29QdjpF7YLimTJpXIQDgUDiUqju9GUB3SKPR9CGhm8rjVJbrMOEaDCXwJAo9RQtxbTTlrhq0+fYPG+SDMtK+sIx4h2qlxhIoo1AooHIAb0elx0PuxdpI7IYJcqLM7lzzoKM1dREZF3yZiEKJWClACWOfaNR2quo/FmqY1lzTTZLJ1imQFn+HLYAq1C1UFAHU3Ex7MGBTlv5HSMNC1v8Ab6/b/hNtFoFmmS7PIl9dNUlRKUkIYDNRUS6Q6tDmR4Kqz3goYkSrPIJzxqKz5oiL0ZaVJXbZ5ZU7tuaESw/VIDtmDibdR2hid03xzUy04UIJYqfETViQBp5ZE1DP9HaPGxzlklLncsJt02jqZk2faHIDITLSAConCmqwalZCahs4qJfR63DK2gnjJYce6oGLG++lsgLloUohCO2kBLk9nBLJY8VqbdSdorrH0wWSy8CU7pSpRzY0xD4+caU0c52SkG8ZIdWC0JGeAkK/wW7+Cn4HKDkXgJn8az0mM6k5Y2/Coa6h2cHxEXQt8tbBCwokZpyNH5Dk8Zq/JBkzU2lAZKlATAMnNEr8aJPHDxjpVoQyyi7NXZbRLmoExILKD566g8QXB4x0ZG02AKUVImqQlVQkEsHqcuLmOjh4TPsLr1W6Z6OmdJlBkhIAoyUgN5UhqdfCRkHjKzL3QqiSVnZAKvUUgBLtCu7LYbrU3oxMc9Z8/SXs++laMOQijvPpGlC0y5kxWJZAAY6lnfICDTdM09+c3BCW9VPB/wCkSUkrCQuZhICphxHWjnIcoWy0RDawcji/pBPwyhu0pnKSRLTgJyUsimVcNfWLagYANTJmHt4bm0NS3vjGUUYst3qISFzHajhkvsS75xaWy5ESWchZOYLluIckeghq77KmcoyiSAsFJOvdU7cWePMenfSKcq8lS0zVpRJOBDK/ElIVjO5elfmYjdFSPTJ6EqThcJ2pQeG0PXVeiEglRJTiKQSB+EDsjTxbUiK67p6JkpExRDTEA4QxUMQchsht2vIxk7TaVA4ZalBOIjAFYipLkiYahqFsQzz2jnOuSo9FF8JxJcpKVEgEtVmJbPQv4GjQ0LTKmKClBLMAGNQoMD3SzOW58wYwqbxOMJoEpUxeiXxKIVknQn/E5w7ds3qlkdigydwGOIAkHNn1NRwiS0tXSo1RurTaUYQOySThDClFFJGTuG+HGLGyyZSxRKTo5SmtHfKPP597px9WkBTklJKkkpxAOCAXqTkRuI0V32lSUY8yWALskB8L4i5d6igABD5Rf7b5RNi/m3PJUXKA/AlIpwSQII3RK/8Ayl/4AfCEsCuyNXDuKitTDZvVGEqFQkkKbNLFi6cwxieHiXMV/BB7/TJQPcQ5NaByfmWeIMu7EKUuVMly+rCuwAyc0hVGq+fNvGIlrvuUpRkLURjKTKWlqPhZQOXZJCsWRdq5GAq854EybMCTMkgymSeypamaYBmHAFDvrrxnLEt6Xz+4WXSmu5pRcsl36qW++FL+bQF43fKKXXLlKbIKCf8A2oIq7P0klCasqUoSSMYmKBHZDA4Us57Riq6Q3sqdImyQFom4MSXBSVoAUoTEj8IKQxGbqA1BNUsDTpK19Pz6E1pcbl9ZrqldWFKlJQSKpQSkMMwyGByrSCmdHpGErTJQFkOTUE6kEg67xR2G8j1SesXheUGChiJZPbJbM4mqcsJEOSb9OEuquFLf3OVDC4DgBnjUFiS2it/kjWrVuWy7hsi01lS1AKcOVZkVI7VCz0iN/pVnl96WCFKLjGWAYmortpkDGfm3piSVlRCSoslPeOHtZjZWIuN84jXneSgSp2dfZd1NRGZZiQzZ61JaEoY6VxXoDaSrDY0OlCUpcOcKlNWmYVQ0HGGV3bZ5ywJ0mWpg6X7VXoxc6N6RkbPaiAnqioZBJUxxFxiI31qztnwK0XwtUshGJKlJZJJAJolxwJBO4Dxl48LduKv6GoR1NRXmPS7olLtBmSJYRJk8ATMWkHIChAIHs0w/Sq/J85S+uGEpPVJQHwgZqNakqSBXVxHo1x37ZgiXJQrCUgJKVDC6qA1NC54w5etistrB7pORIAfxBDKY7g5x6sTjFfp8z29T0spJRSrTx+fM8nva/kzJKEkzFTAQ6l91quEjEyQ7aCggbgYklu1+YmiaHw899I0V7fs+zMk/458sCyx54xyiiXdq5KerwnHXQhRqzhCmUQAR2gCOMao+ZLBOHxIh2i29ZPWtyBVm27qRQhg1acqPS9u62SRJR/8AHUsoAx9XRTUBLlRLO7lhTUPTM2eT1hIBEsFVXzSKgBnc5GLvo/0ItlplhcuWcKg4Wo4RXJsTYuYccY2kzjJWPyukgTMKhZSKMP4ikkgGjgcQ+geLK0dO5a5ZQZCu0GXUKDGlD2S+0NL/AGb29P8A4xzSp38hzjJ3jdkyQvq5stSFv3VfEHWLqmiaUae7OkoEtIUqof8ADo5b0akdGUSENVTe6HyrHRpSZvSfQRKUhgABwpEeZatohTLTvDKpwjhqOtEpc+GBNO8MFbwkyY2UZstDy1scTnl94ZmTga67xGtM8NDcoYyzFucZabKXvRma89P96vAIKPisRlb4u2QoLMxKesWtakzGDpxKOFjtuNY0FlmIswXNUsAokmlSaqSRQDXC3GIV12VE9MwTKnAgCj1UkqNat3aEZEiNIGPm3pMTZ5cklKMKVY+1VTLUAH/KEAni0U8m3pMvCMTpUEpX1vZLBkpIYE9os4yDCgh2+LrnCYsDGRRIFWCkliz00JYaqD5wsu6VJZC6lRNXBJoE9lh3T2O1UE+IjyTyRTe5zeqzpU9c0utQxPimAYQrMApoRiqTSuZziRaZqkzlhUwTiRi6xBJDUd1AB0gu+bOdobVdPaSQwIVVIHaBFXqkFy2eVNqQhsBExZTNUl8wFYScQASnsitaV4Hnl5lLlmrfmTrltuGaVYgpsKaFJSoGhSSRiKj2uGWUaS7L06yaklzQCpbP+GAwpU5nOtM3ihsdz/w8VBj7RxKOEYe0rskYqAENln46m67mRJSlRGFQUHUFlTsJagGLuaBjV48efqv00r2NxRqkXkoLYIOBLA4WOoBFS7AEHj8aHpXJmylptUhQV+cAVI2UkOFJamIB8ncMUpdtowqY9oYq9qpwuBQ5skZbDfORbbMZoISSBTVqkoYsKnXgxdxnHihlyLa7vublFNUY2y2uSpWIggFClOl2HfmKRUkYO7XZRziQtK56CvrmKkhs3OBWNjpSuup5RpbNd+BlKloOSQSxUXFaMwJDBq/hrE5EiUjEAAKOaVcu5Na5ktSo5Qn1FP6c+pxXTu9zIrM5UolIV2BhFQtSUhpmMs+IkEGj6ZxOsdjXOQSo4Z6aoD9ru4VlQbIkhR5IFYvpc6WEp6tJUFAnstX8AdRoCeyBX4RVi/UImqlS0ElBLDMckrZqDYhgN3i4+qavSvz7Glhpoi2qwTnKiFMQxqcyUAADMOnyIqYorZbEoOLElsJGEpZQKQHNKgk8ND4Xd7XgqfZyKgqYYVBmIC8XZGaTgLEflOjvibxkzknCO1hITsAOyx2IB34sCxj19N1Dk3rLKKTLRd+lUtqFgpSkhypIcUd3ftMXyrnpWf6hNwpSVKCAAoBGTlQ3NHc1NWbdorrHeWABWGgLrNA4OEAH8xdjXUUarhOvAzpy1qLOXKHABd0gBgdy+X4jH0nwY1bFnZrxCCwJxBQYgMGKUoGf4iOBO8WtjmlckLxl3AHDCD6uYyVstahhQZmIMlWFIHZ3dgXqNcQqIs7T0glywiUEFQUyuxoCTVqlRIqzxNLfB6uilBZbyOki3Raw2GYlKgQycqCgdJzBpnDlntU2WoKlKALd1TV5GG0ygQkt2TUcvlDf7sKlLDgR9Y8+tpn6ZUuOGaKydLhRE6WULNAdDyi5UZc5GSZks6EBQ8QXY89Y8/UVYy+RzFCPWHDbDIKTJWtLp7SSQpJNKh61aO+PqO7MzwRl8K59DUzrsky1CdgKgggmWrtoNd1HGANsWH+Uxq7J06lGikKR/SyvUkN5RhLB0pQphNGA7iqfqPdYsTLkr7QShQ3GvimPXHLZ8zqfZdu47f6N0jppZzRJWsgPRPxaMR+1e97NabHjomfLIMsl3UFEIUkEpDtiBaMz01mlHVqStdSUkFZUlgKMk0Biit12hYAxYqkjEohnbDhKQQHD5pPMQ8aKdM8vurM4tx3a8luUsm4lzx1oLBTtySSn5R0T5VzWlAwy12hKRkEpSoDkpM0A14R0dNUT57wZ0/hfoz1e0ocP9hX4wMkAB8+UMyyua4AwhNCVUA2ETpUlKQw7R1OkcyjLKVkGG5jg34e0fzK7o8NYkqlE51+Aipv3pNZ7IntEKXoNfAaRQTZ139nEtQAFSSQPGunvhGN6R9PESQZVkHWLDgzG7I/pGvM+kZm+Om06fMCjhCElxLLlJ/qbP48Yrl9IFBRVgkknMhKhnVqKyhRGywsdtmzVFUxb4qqz7RDsSS5LB2GQekev/s8npKlhX4pMtQ5pBTrxMeG3famSOHv5esehdCb9Esy5iiOwShXI9oFtdP8AExpkRrrxsAE2cwBCpivxhJFXyOhgJdjm/hlS1M2H+IhhuwBcVD+MX91W+QpJmEAhSiQVJW5FADShdn8YetMxAUcBdL0bKulY+dl9n4sknJ3v8zVWUEuxWlv/AKkCmYWjyzFM9YL/AEmaui7PLIzBxy9QxFTnTZqxeT5S0gKUkpGlIizZpajngHB8Nox7sw/P1JoRCmXbMSrF+7oKmUH6xA7wwnXMj9YYl3epKSOrUARVPXSmcBgWK9qPqBXaNLZ7fKKUgpS7B8QU/jXOHxaJP5Zf+6C9m4Vw36ijHT7JOfEmWSpsOLrJOTlQf+IXZ8O5o+UNyJtvQMKkJWR3VBUsnkp1YdfuY2xmSNUo/wB31jhMs+yfNf1jXu7C+W3+5dzEz+vmF1SkqALhJmSwQe6XPWAZVpQ8IqbRdtqfEhLkJwgKmyggtWqSs0NAwGjuWEekrtFnGiPNf1gTMkmoEs/3q/7QXs7Cu5Tz2RZbagJYTCkk9nrJLJcu9FMzEhqa5AhpU+7rVMT3SFF8QK5QOoocRAcNXPwJB2otUjPDLI3xK+OKERb5ByEtv6lf9oe78XKB5ubuvBJLSHBapXLx1fE+FRep3ILFgIiW+47UolRkLSCGOHCrgWwk0IpUOQK7R6oq1SW7iPBSvrESYmUsuwD6VPDN3jS6HEuCONqmeRWjoNPVUS5v9pGIgA6P8d+cMJ6IKcpVLmF0MyQlwyQaKx94kZGh+Hr4s4UGRUg8DlU6u7RXWycjC+MnXMOeAD1jqsDqtTJ4a7s87HRRZAPUTcBzZIJBoMROjl8g3OIXRe4hapk2dhJlpUlID/gxBAZVahNeLCPVkKssyUSEpCiGxqJSoFQLEgKDHhwMZvoRd/7tJMlS0qImOrC6kkISD32ASmuZ2IEdMePS27saa4M5YiqWOwcaUKUkKZwQFEB3BBBS3nEq0SUzRiSerV+Uk9WTzLlJ5uOIhpEwyTMTK62WlEwpZSg6SQFMTLJTuKE5Zwc28piwypilDYqLeUcpQVs/RYJOWKLXYiKC0qKVio5bb7VzgZi07eYeH5FvVLowUivZUHAckltU+HlEjEldZYSo/kKQF+GFgvwrwjm8S8j1xmUU2z6gwwmctBoSOVP1i4K5ZzSUngfkX+MAuzIVkoeIb4PE0tHoWQq123GwmupIL5xdWaRKmFIkqwsA6Vk55OC2sV027DoH5F/hEbApCnrT0iSl3PT07Sdrk3SOji2qpD8Cf+sLGdldKZ6QBidtwDHRdWM049R3RrrptJtaZU1OSh2k7LSyVBvANwaLidOlyUlUxQA3Jp56+8o856GXwqSmcEst5RmJTl2pY7SK5lSBp+URj76v6fa1PMVTRAPZH1j3pH8/bNb0p/aEVPLsuWWMin9u/PlnGAmY5iipZUpRzJrD8mQ8WMiyNpFIVsm7lK0iysXRdczJgNz9MzGjuq6XYr/xGfj9I0tjsBIDfYRGzSiYmT0EXn1rcgY0tw9A0o7UyataTmmiUlt2r6iNLIsBo48Xixl2Y6eESy0hJcugSksE0AFKDQDSNFcl3AJ66aThFUgl8teWw1+LHR+4sR6yZ3BknRR3P8o9Yfvu3db2Edweuj8topG72Bt9u6wkkEAd0OGH3iAo7E/Dwhvq+A84Ey+BP9xaIUkyllmevgzQxNUxzflAEE6eDw2EHb1gUJUwqoPjtwgFSyM6trBB82hmYTtEAJUQT8PrvALUM8I89YLqVbQyUH2YFFCq1AoaVhZc8vlAdUTr8fOkPSkEsH0z3b5wBYWdRzMPFQ2DfWIgRT7waZZzikK6yXsZE3EkZUUHooflrpFrfV1S58r94s6QdVoAcuKlhvuBzEUl5WMhWIfi46+ULct8Ls68WaT3kPnxFKKGnlGjLRmJ9swKdID8g/nDt03zKKbR10zC4UFS2HbC0oDjdSSgsP5zxjW9KujaJ6P3qyh3qpAGe5A/MKuny4+ZXldOOoUUqbMFvDJoE5M/Yr76icpj2SEpOrYX8xUj6RrU2tFoSDQLbvDXx/Fzz3jDWy4piDm8NWO1zJB3TqPmNjGJwvdHt6TrHi/TLg2kxJTnlpDdDlCXbe6JqakEavpzGnMekSJtlaqaj1+8edqj7sJRyRuO6D/ewqk0Yv5xRY8clDgrwMBOshYqScaBmRmP6k5p+HGGAqDlrKSFIUUkagtA6K1wNpWd4fSrEO0HO+u3lC2iehQcpwzB+UMlY/pySrlQ7PAyRGWjvjkMrsQeOizXgJfE3Bo6OWk9KyvuUki1SrFaSlSZhMuYClgCky1DKpBfApubxnUSAVHCGS5wg6B6DiWjR9NrMOtlr/Mhv8C//t6RAu2wmYWSOZb35R9FPaz8C1vQ3ZrMpSglIc6ACNfdVyhIClHEoeQ5VziRdd3plhglzqrfzi5kyH4eUGzSQlmkJGj+UWMiWRp4iEkSWHqffOJQQ0QoUsVi8uS7etOJT4B4YjsOG59iLc129ar+Ud5XyHExoL0t4koCEMFEUH5Rk/0imW/Ij35eAH8FFBkpv+H18ooi+lBCcaQSX3gVKher3LwCvflDoT7+8NrMQo1iIhMHGCKudY4KqX8IAZUDvAYCP1iSsmGViABCufHxhAW1giOJrADjACLUBk78POBlzCDn4fOOKefv5RwJ0p6wKPCJKDsacoipXBomQIHOllQKcn9iM/apBS4JGe0aFSvOIN4ycfMZNFBGuK/VWeY6iFS1d9I3yxDQK+PkRN6W9GEzE/vNlqFDEpCciD+NI33H6RmJqdxV9mi46MdIDZ1YF1kk88B/MOG48RXOmWYm1ynfX3nSKC8rBnkY9h6YdF0rBtEgOCMS0p1BrjTvxHjvHndolD7RRyYQpVLU6SxjQ3Lfr9k0P5T/AOp05ZcoC8LGM8oz8+QxpSMyipHbB1E8LuPB6AUpmB0muv0I0iKpJSWMZq676KSAstsr5Hce6Zxq7Pa0zAApq5HQ8joeEeeUGj7/AE3V48y7MjlcNXpeIkofM6D3pDtpk4S70FTw0+sZS+rSZiwwzyA1Gni8XHDVv5Gev6zwI6Y/E/4+Yi76nkkhYAOjCkJCm7kCilqxa4UgjkC9Y6PRpj2Pz/8AUZ/85erN9fNg61SA/dJJ3LtT0ifYLGAAAwA4esIUErPr60i8sdhSGoePvKMLggcmzgDOH5crXzrCkM1K6Q9IlghzSKDkjjrk/vaJ9hsJmqCE+JagGp+0N2aylaglAck0+vACNjZLOizyy5oKqUdT7oBFRluhLRORZpWWVEjc+6kxkLTa1LUSTUmsP3jbVTlORTQbfUnWIqZLcIMJDssvDtd4alyn09/ODMthAoZmUeGSt/e8BkffP4Qikjz2/SBQ1Lf36QmI6UhsofKHEoIFYANIcQi5cEk0zhFDWIBhSH0hUfT2INaRyhAB6Z/P0gBgpfQwKgX0+8GssdHggptM4AAPrCpJg1kHhAYi2XP6wA4QTrEafOSjvFgdWLQ+l/WkKZb0IFd4AobeJawVIWHFCNxwflFUV7FhyjUzLrlGpSx4UiDbLoADy3PAt6MIpCR0R6RdSRKmn+Eo9lR/AX/4H0zyeD6b9FGe0SEuM5iAMt1J4bgc+WbwvmG08Y1XRHpCxTZppplLX8EHhsfDaNEZ5pPs7im+Tv5xUWyw7R6t006LYSqfIAw5rljTdSRtuNOWWEmSQaQBiLTZmeOsVvXKLZp1BjR2uxAj6RRWqyQqwm4u0WU+345YALhSmAeuRpXg44RXWOScalNUHCkDc5txq3jAS7MsoQUVwqUTTdmfwjR9CbMVTgpQrLCppH9OXqoV4QSpUhObnLVIvrB0FQqWlS5i8RFcDYQdQHL0y8ISNVZ7BZbSkT0mYBMGLskpFcywNC7kjd4WLSMlbcKXdWhUSDu1PlF/iG0RLqsSZaEoGgAJb2xiwRL1NftHNI6ABPCJKEuRTWgzrHSpf3jUXHdgSAtXeIoDpx5xSN0SLou/q0ue+czt/L7+kU1+3l1isCe4k57nJ+WcT7+vLCDLSanvHZ9ObekZ166xTKXmchFQ48fvDxTwyhAptYVJepiGgQPKEUwMGF1Yb6c4bw75+UACcw/wjlK0pnBKSXoTn7984YVZw7+rk08dIAeA9YJfv38obMoZHL5wcuUEhhSAFA3hDCLMARSn6QBxIoYLGM2gQOPvKDmI1p71iFGlLHvKOxbRyhT4frzhEHj73gDgH3pC5RwFMx4NDH7uMzXXeAJNN34e9IVBhqUG3y3iQitdvbQABQXgJkrQxKY8IbUPe0AU14WILDsyh5HgfrGcmUOFUbabKcH4/CKi3XcFh9dD8jwiguuiV/CaBJmn+IHwqP4wNzqoDzFd4o+m3RjqyZ8pPYPeSB3DqQPyH05ZUi5SkKFWUkgirMRUEGPQOjF7C0pwLP8AGAIUnRQyxAGnAjQ+EaMcHkcxGYziDa7I4yj0Lph0W6h5soEyjmn8h/6n0jJKl76wKY602YpycRqf2ZpxTpiDmbNMAffEiIlusj1avvWGuitq6m1IcsknCTwUClzwD4v7YpKN9clxrTIlgrKCE1TtrpHRV23o6VTFldvmglRpRNNKPSjR0CG2oKNWDRKqNnr4RyEfrFrdF2dYXPcHrw5Rg2Srku5/4ih2R3QdePKLK9LeJSaVUe6PmeAh60z0y0FRyGQyfYCMfbLQpaipRr8OHKLwYW41MUVO7l8y+er+cJho9M44LyL+/bxyQ9KePHjENiio9/Hwh1QPh720hJavKCfasACSw5xylaPCqAHM08oBIDP6QAWlW8M4aKcz6vvBJPs8eEKRXP5QALnb3vBOwgC+jPo5IgQPf3gBVmG3amfuscT7Pwg1gQAMuZw8oFamoH8/dIPFrn74RxA+3P7wKDh1bxf5RyVV9/rHKyPj8s4RKd9tvf3gBUVfk2X3rBBPD3+scHo9W8/TSHR6+8oAbBH1yh6VlpDS0+kEneBBx67a7fOCliGZR98vhD6TADK6Q0tJDNlxiStLikNNApVW+wiYKhiNeT6aiM/MTMlqHaKFCoUKeI4ZvGwmjU+3iLabIFAggH3mIWCx6JW2bOlkLWmYliFoVmAaA1zSQD5mM30q6LqkKxy3Mk/7CfwmjtsfA8ZEuQuzLTPlngUqLYg7GhLqB5Uz0jcXVbpdrlEhNO6tKg4yy2IjRh7Hi67Hzikva7iBjSHIrThr5iPTOlPR1UhWJAJlKNC57JP4T8jrrGaVJqdeXusCldYumUvq09ZIlrWAxUpLktQOcBcswd6wkQLR0flKUT2kucgph5R0UzR7hYLAZimFAKqP04mNMkJQn8qUjyaOs9nShISkU9TxMUN824rOBPdGf8x35RkckS9baZqnqEjujI1o54vFfr70iQpA91eGSoba/D4RDY2KH5CDFBzjlLbhpr+p1g+ty095wAoltl79mOCn01zy3hWoau3D3SExtRmgAF1OTQJHCjwYSc/fGHCjJhz48IAYTnBecKrOETu0AcVfD6QJz9KwYrz0PnAge6wAOGmjQaT5PCpHPm431eFw0PvwgAcD6PwhFnTXlDsvKu0CB4QA2MLvXl72haQQlvn7eDFOVKQA0mWc61o3jHKSxZvh9YkBYI0pDD+84AQjVvGFSNYFLOae/OkGG2gDgK6wYUzQuHUQi/P0gAs/j4QAQWL66QfWZDb1gsY5ZQBFmPs+8AAGyZ9f0iVODnLn8YAp2FYFINpkpUGUOPjXKAu5C7NMEyX2gQykGjjZ8qHXhziZptHAe/pAhqZKpU+W4GNChUEeaSPzCMF0j6PdQrElzKOStUv+En4GLy6baqUutUKbEOWo4++MalchMxH50KHgQffpFM8Hj/7ufyvxcR0bid0RViOBYw6YhXkY6KW0aC9rwAGFBd+8ofAfWKQnwjipsn8fbmOJam8ZCGpo58/vAKdi3mfbwa9/vAqSBnADJfJgfdYPBiBDbDjC4cy2efCHEqb5b+2gU7CwZ/jBJf0hsg6+HEQalUI4efpACIU5ggeUMjbPl8G1gyumvn7akALMhugYZwmNt88jChVeP6/aAHUB9B4QikU09YUUzjg+tIAApDefukKEhsvfCOBD+/COGnKAFIZvWFAB+3GOLekIlOddaQAgZmME9c/ENHFNXOXH7wCiw9H0/SAOLavCFG418IRS8qOffy3gVHiW1rnAClJ3YDcQqTU09PnAqBHJ4UPq0APs20AlNd4JKhxjlKBqMt8oAQSgOUEANvFoQGDOggBsh/CFlkH9aecKkVpAJG/hpAHM5PvwgVCnH2xh1FW9IXq/EjL3tAEcI5ROsN4rlghLM+RBLcRXKkMmW2p9/KF6p0tAFgL7mH8KT4H6wkQikjWOgSkGOZ+kNpFHOXrrHR0AIoV2GXnAGlffgI6OgU6ZL55e8oEuE8QP0rHR0AClasnzp9oQnfT7x0dAAv8AeEWWYaneOjoA6rD37yhUJ+u3h8Y6OgApenv0g1pIzyjo6AGs6be/CCfPl7rpHR0AKlWYzG2kGFfDyhY6ABVAsTr7yjo6AECffKOUKVrHR0AItI3qPbwo984SOgA0h/e8EToWjo6AOCvbQbCEjoA5J029vCLTHR0AKgGp2h3EY6OgA9qP4+FIVKB6x0dABJBaufvjHR0dAh//2Q==",
                           });
                     })
                     .catch(err => {
                       if (err) {
                         swal("Oh noes!", "No parking spot available on " + code, "error");
                       } else {
                         swal.stopLoading();
                         swal.close();
                       }
                     })
                     })
        };

    reserve = (todo, event) => {
        var self = this;
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while ( i-- ) {
          values.push( localStorage.getItem(keys[i]) );
        }
        
        const userR = JSON.parse(values[0]);

        axios.get("https://parking-system-ecse428.herokuapp.com/spot/getOwner/" + todo.pkey)
        .then((function (response){
            if(response.status == 200){
                var owner = response.data;

                var startDateString = self.formatDate(self.state.startDate);
                console.log(startDateString);
                var endDateString = self.formatDate(self.state.endDate);
                console.log(endDateString);
                console.log(todo);

                var requestHeaders = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                };

                var reservation = {
                    plate : "",
                    startDate : startDateString,
                    endDate : endDateString,
                    pricePaid : todo.current_Price,
                    startTime : "0",
                    endTime : "24",
                    user : {
                        firstName : userR.first_name, //retrieve from local storage
                        lastName : userR.last_name,
                        id : userR.userID,
                        password : userR.password,
                        email : userR.email,
                        isRenter : userR.isRenter,
                        isSeller : userR.isSeller,
                        parkingManager :
                            {
                                pkey : "1"
                            }
                    },
                    parkingManager : {
                        pkey : "1"
                    },
                    spot : {
                        pkey : todo.pkey,
                        addressNumber : todo.street_Number,
                        streetName : todo.street_Name,
                        postalCode : todo.postal_Code ,
                        avgRating : todo.avg_Rating,
                        currentPrice : todo.current_Price,
                        user :
                            {
                                firstName : owner.first_name,
                                lastName : owner.last_name,
                                password : owner.password,
                                email : owner.email,
                                isRenter : owner.isRenter,
                                isSeller : owner.isSeller,
                                parkingManager :
                                    {
                                        pkey : "1"
                                    }
                            },
                        parkingManager :
                            {
                                pkey: "1"
                            }
                    },
                    headers: requestHeaders
                };


                var reservationUrl = 'https://parking-system-ecse428.herokuapp.com/reservation';


     swal({
          title: "Are you sure?",
          text: "You are about to reserve the parking spot on " + todo.street_Number + " " + todo.street_Name + "!",
          icon: "warning",
          buttons: ["Don't reserve", "Reserve"],
          dangerMode: true,
        })
        .then((willReserve) => {
          if (willReserve) {
             axios.post(reservationUrl, reservation)
                              .then((response) => {
                                  if(response.status == 200) {
                                    swal("You have successfully reserved the parking spot!", {
                                        icon: "success",
                                    });
                                      self.displayAds();
                                      console.log("Reservation created");
                                  }
                          }).catch((error) => {
                               swal("Oops something went wrong! You may want to contact the development team.", {
                                    icon: "error",
                              });
                              console.log(error.response);
                              console.log("Failed");
                          });

          } else {
            swal("You did not reserve the parking spot.");
          }
        });



            }
        }));
    };

    divStyle = {
        backgroundColor: '#A9C5E8',
        borderStyle: 'solid',
        margin: '10px',
        borderColor: '#A9C5E8',
        padding: '15px',
        width: '50%',
        borderRadius: '25px',
        fontFamily: 'Georgia'
    };

    calendarStyle = {
        display: 'inline-block',
        margin: '20px'
    };

    rowStyle = {
      textAlign: 'center'
    };

    buttonStyle = {
        borderRadius: '10px',
        fontFamily: 'Georgia'
    };

    render(){
        if(this.state.loading){
            return (
                <div>loading...</div>
            );
        }
        else{
            const list =  this.state.spot.map((todo, index) => (
                <div id={index}>
                    <div >
                        <div style={this.divStyle}>
                            <h3>Parking Spot {index+1}   </h3>
                            <hr></hr>
                            <p>Address: {todo.street_Number} {todo.street_Name}</p>
                            <p>Postal Code: {todo.postal_Code }</p>
                            <p>Price: {todo.current_Price}</p>
                            <p>Rating: {todo.avg_Rating}</p>
                            <button style={this.buttonStyle} onClick={(event) => this.reserve(todo, event)}>Reserve</button>
                        </div>
                    </div>
                </div>
            ));


            return (

                <div>
                    <div style={this.rowStyle}>
                    <div style={this.calendarStyle}>
                        <h2>Start Date</h2>
                            <Calendar
                            onChange={this.onChange}
                            value={this.state.startDate}
                            />
                    </div>

                    <div style={this.calendarStyle}>
                    <h2>End Date</h2>
                            <Calendar
                            onChange={this.onChangeEnd}
                            value={this.state.endDate}
                            />
                    </div>

                </div>
                    <button disabled={!this.checkDates()} onClick={(event) => this.displayAds(event)} style={this.buttonStyle} >Show All Ads</button>
                    {" "}
                    <button disabled={!this.checkDates()} onClick={(event) => this.filterStreet(event)} style={this.buttonStyle} >Filter Ads by Street Name</button>
                    {" "}
                    <button disabled={!this.checkDates()} onClick={(event) => this.filterPostal(event)} style={this.buttonStyle} >Filter Ads by Postal Code</button>
                    <div>
                        {list}
                    </div>
                </div>

            )

        }


    }
}
