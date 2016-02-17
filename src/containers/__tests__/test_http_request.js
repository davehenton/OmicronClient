/**
 * Created by Michal on 2016-02-17.
 */
'use strict';

import expect from 'expect';
import React from 'react';
import {HTTPTestTemplate, map_state_to_props} from '../http_request';
import {map_dispatch_to_props} from '../http_request';
import {URL_CHANGED, url_changed, url_changed_reducer} from '../http_request';
import {RUN_TEST, run_test, run_test_reducer} from '../http_request';
import {GET_DATA_FROM_URL, get_data_from_url} from '../http_request';
import {get_data_from_url_reducer} from '../http_request';
import Header from '../header';

describe("HTTPTestTemplate", () => {
    let on_url_change;
    let on_button_click;
    let http_test_result;
    let url_value;

    beforeEach(() => {
        on_url_change = () => {};
        on_button_click = () => {};

        http_test_result = {message: "Test Result"};
        url_value = "https://url.com";
    });

    it("Should provide a React JS template for rendering", () => {
        expect(HTTPTestTemplate({on_url_change, on_button_click,
        http_test_result, url_value})).toExist();
    })
});

describe("map_state_to_props", () => {
    let state;

    beforeEach(() => {
        state = {http_test:
        {reactjs:{data: "This is some returned data"}, url: "test_url"}}
    });

    it('Should map the state to the parameter object', () => {
        expect(map_state_to_props(state)).toEqual(
            {
                http_test_result: state.http_test.reactjs.data,
                url_value: state.http_test.url
            }
        )
    })
});

describe("map_dispatch_to_props", () => {
    let dispatch_list;
    let dispatch;

    beforeEach(() => {
        dispatch_list = [];
        dispatch = (input) => {dispatch_list.push(input)}
    });

    it("should give two callbacks for the callback functions in the container",
        () => {
            let result = map_dispatch_to_props(dispatch);

            expect(typeof result.on_url_change).toEqual("function");
            expect(typeof result.on_button_click).toEqual("function");
        })
});

describe("url_changed action creator", () => {
    let new_url;

    beforeEach(() => {
        new_url = 'foo'
    });

    it('should create an action of the URL_CHANGED type', () => {
        let action = url_changed(new_url);

        expect(action.type).toEqual(URL_CHANGED);
        expect(action.new_url).toEqual(new_url);
    })
});

describe("url_changed reducer", () => {
    let state;
    let action;
    let new_url;

    beforeEach(() => {
        new_url = 'https://api.github.com';
        action = url_changed(new_url);

        state = {http_test: {url: "https://api.google.com"}}
    });

    it("Should return the old state if the action is not URL_CHANGED", () => {
        let not_proper_action = {type: "GENERIC_ACTION", new_url: new_url};

        expect(not_proper_action.type).toNotEqual(URL_CHANGED);

        expect(url_changed_reducer(state, not_proper_action)).toEqual(state);
    });

    it("Should change the URL if the action is URL_CHANGED", () => {
        let new_state = {http_test: {url: new_url}};

        expect(url_changed_reducer(state, action)).toEqual(new_state);
    })
});

describe("run_test_action", () => {
    it("Should return the correct action", () => {
        expect(run_test()).toEqual({type: RUN_TEST});
    })
});

describe("run_test_reducer", () => {
    let action;
    let state;

    beforeEach(() => {
        action = run_test();
        state = {http_test: {frontend: {is_fetching: false}}};
    });

    it("Should return the old state if bad action is passed to it", () => {
        let not_valid_action = {type: "TAKE_NO_ACTION"};
        expect(not_valid_action.type).toNotEqual(action.type);

        expect(run_test_reducer(state, not_valid_action)).toEqual(state);
    });

    it("Should modify the state if the correct action is passed in", () => {
        let new_state = run_test_reducer(state, action);

        expect(new_state.http_test.frontend.is_fetching).toEqual(true);
    });
});

describe("get_data_from_url action", () => {
    let url;

    beforeEach(() => {
        url = "https://api.github.com";
    });

    it("Should return an action of the correct type", () => {
        expect(get_data_from_url(url)).toEqual(
            {type: GET_DATA_FROM_URL, url: url}
        )
    })
});

describe("get_data_from_url_reducer", () => {
    let state;
    let action;
    let url;

    beforeEach(() => {
        url = "https://api.github.com";

        state = {http_test: {reactjs: {is_fetching: false}}};
        action = get_data_from_url(url);
    });

    it("Should return the old state if the action is wrong", () => {
        let bad_action = {type: "NOT_A_VALID_ACTION"};
        expect(bad_action.type).toNotEqual(action.type);

        expect(get_data_from_url_reducer(state, bad_action)).toEqual(state);
    });

    it("Should flip the is_fetching flag when fetching begins", () => {
        let new_state = get_data_from_url_reducer(state, action);

        expect(new_state.http_test.reactjs.is_fetching).toEqual(true);
    })
});