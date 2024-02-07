import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import SingleNewsView from '../../src/views/SingleNewsView.vue';
import store from '../../src/store';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key],
        setItem: (key, value) => store[key] = value.toString(),
        removeItem: (key) => delete store[key],
        clear: () => store = {}
    };
})();

// Set localStorage in the global object
global.localStorage = localStorageMock;

const article = {
    "source": {
        "id": "rtl-nieuws",
        "name": "RTL Nieuws"
    },
    "author": "RTL Nieuws",
    "title": "Nederlandse orkesten niet in de prijzen bij Grammy Awards",
    "description": "Het Metropole Orkest en het Radio Filharmonisch Orkest zijn vannacht niet in de prijzen gevallen tijdens de uitreiking van de Grammy Awards. Het Metropole was genomineerd in de categorie Best Large Jazz Ensemble Album met het album Olympians. Het Radio Filhar…",
    "url": "https://www.rtlnieuws.nl/nieuws/buitenland/artikel/5433177/nederlandse-orkesten-niet-de-prijzen-bij-grammy-awards",
    "urlToImage": "https://www.rtlnieuws.nl/sites/default/files/content/images/2024/02/05/ANP-490280362.jpg?itok=DSiI2Z2c&offsetX=0&offsetY=0&cropWidth=1280&cropHeight=720&width=2048&height=1152&impolicy=dynamic",
    "publishedAt": "2024-02-05T02:42:37+00:00",
    "content": "Het Metropole legde het af tegen het The Count Basie Orchestra, dat won met Basie Swings The Blues. De prijs waar het Radio Filharmonisch Orkest kans op maakte, ging naar het Los Angeles Philharmonic… [+265 chars]"
};

describe('SingleNewsView', () => {
    it('renders the news single page with provided article data', async () => {
        await store.dispatch("selectArticle", article);

        const wrapper = mount(SingleNewsView, {
            props: {
                article: article,
            },
            global: {
                plugins: [store],
            },
        });
        expect(wrapper.find('.news-title').text()).to.equal('Nederlandse orkesten niet in de prijzen bij Grammy Awards');
        expect(wrapper.find('.news-author').text()).to.equal('Author: RTL Nieuws');
        expect(wrapper.find('.news-description').text()).to.equal('Het Metropole Orkest en het Radio Filharmonisch Orkest zijn vannacht niet in de prijzen gevallen tijdens de uitreiking van de Grammy Awards. Het Metropole was genomineerd in de categorie Best Large Jazz Ensemble Album met het album Olympians. Het Radio Filhar…');
        expect(wrapper.find('.news-url').attributes('href')).to.equal('https://www.rtlnieuws.nl/nieuws/buitenland/artikel/5433177/nederlandse-orkesten-niet-de-prijzen-bij-grammy-awards');
        expect(wrapper.find('.news-image').attributes('src')).to.equal('https://www.rtlnieuws.nl/sites/default/files/content/images/2024/02/05/ANP-490280362.jpg?itok=DSiI2Z2c&offsetX=0&offsetY=0&cropWidth=1280&cropHeight=720&width=2048&height=1152&impolicy=dynamic');
        expect(wrapper.find('.news-date').text()).to.equal('Published: 2/5/2024');
    });
});