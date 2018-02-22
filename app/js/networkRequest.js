(function (){
'use strict';
    
var htmlPage = null;
var commentCount  = 0;
var url = 'test.json';

commentComponentsReady(url)

/**
 * XHR wrapped in a promise, only work when you host it!
 * @param  {String} url - The URL to fetch.
 * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
 */
function get(url){
    return fetch(url);
}

/**
 * Performs an XHR for a JSON and returns a parsed JSON response.
 * @param  {String} url - The JSON URL to fetch.
 * @return {Promise}    - A promise that passes the parsed JSON response.
 */
function getJSON(url){
    return get(url).then(function (response){
        return response.json();
    })
}

/**
 * Helper function to create a recursive nestable item.
 * @param  {Object} data - The raw data from response.
 * @param  {String} className - The name of you wanna name.
 * @param  {String} parentDOM - The parentDom you wanna appended to.
 * 
 * @return {elements} - return created div.
 */

function createNewItem(data, className, parentDOM, value=''){
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class',className);
    newDiv.innerHTML = value;

    for(var elements in data){
        newDiv;        
    }        
    parentDOM.appendChild(newDiv);

    return newDiv;
}

/**
 * Main function
 * @solution 1 {addEventLisener} windows.addEventListener   
 * @solution 2 {addEventLisener} - The name of you wanna name.
 * @optimize 1 {JQ} Some of the sytax can be override using JQ
 * @optimize 3 {vue.js} Ideally basic UI should be structured before instead of generated by JS.
 * @security 4 {networkManager} All networkRequest should not expose to client side.(What I did for my old work)
 */
function commentComponentsReady(url){
    htmlPage = document.querySelector('.comment-list');
    

    getJSON(url)
    .then(function (response){
        /* *
         * Loop Through firt level of Json data (comment)
         * 
         */ 
        response.forEach(comments => {
            var commentDiv = createNewItem(comments, 'comment-item', htmlPage);
           /* *
            * Update data-count
            * 
            */ 
            commentCount ++;
            htmlPage.setAttribute('data-count', commentCount);
            /* *
             * Loop through second level of Json data (comments details)
             */ 
            for (var commentDetails in comments) {
                createNewItem(commentDetails, 'comment-item__' + commentDetails, commentDiv, comments[commentDetails]);
            }
        });
    });                          
}
})();