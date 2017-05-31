/**
 * Created by ashwin on 5/29/17.
 */

import React, { Component } from 'react';
import TabContent from './TabContent';

export default class TabPage extends Component {
    constructor(props){
        super(props);
        // Tabs navigation tab
        chrome.extension.sendRequest({
            callingBackground: "requestingTabs"
        }, function (response) {

            console.log(response);
            var bg = chrome.extension.getBackgroundPage();
            response.sendingTabObjects;
            var tabs;
            var table = "";
            var blacklistTableInitial = "";
            var allKeys;

            setTimeout(function () {
                tabs = bg.audibleTabObjects;

                // Adds all audible tabs as a list and stores it in html. The list is added in the next timout function.
                for (var i = 0; i < tabs.length; i++) {
                    table += '<tr><td><button class="close-tab btn btn-primary" id="' + tabs[i].id + '">Close</button></td>' +
                        '<td><button type="button" class="mute btn btn-primary" id="' + tabs[i].id + '">Mute</button></td>' +
                        '<td><a class = "highlight need-size" id = ' + tabs[i].index + '>' + tabs[i].title + '</a></td>' +
                        '</tr>';

                    // Creates a click listener so that when the user clicks on a tab title, that tab is higlighted. When button is clicked, the action is triggered.
                    document.body.addEventListener('click', function (event) {
                        if (event.target.className.toLowerCase() === 'close-tab btn btn-primary') {
                            chrome.extension.sendRequest({
                                callingBackground: "closeThisTab",
                                whichTab: event.target.id
                            });
                        } else if (event.target.className.toLowerCase() === 'mute btn btn-primary') {
                            chrome.extension.sendRequest({
                                callingBackground: "muteThisTab",
                                whichTab: event.target.id
                            });
                        } else if (event.target.className.toLowerCase() === 'highlight need-size') {
                            chrome.extension.sendRequest({
                                callingBackground: "highlightThisTab",
                                whichTab: event.target.id
                            });
                        }
                    });
                }

            }, 100);


            // Adds the audible tabs to the popup.html
            setTimeout(function () {
                if (tabs.length == 0) {
                    $('#tabs').html('<h4>There are currently no tabs playing audio</h4>');
                } else
                    $("#audible-table").html(table);

            }, 200);

        });
    }

    render() {
        return(
            <TabContent/>
        )
    }
}
