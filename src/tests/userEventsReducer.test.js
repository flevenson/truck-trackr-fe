import { userEventsReducer } from '../reducers/userEventsReducer'
import * as Actions from '../actions'
import { mockUserEvents, mockUpdatedEvents, mockEvent } from './testMocks'

describe('userEventsReducer', () => {
    let userEvents;

    beforeEach(() => {
        userEvents = mockUserEvents
    })

    it('should return the default state', () => {
        const expected = [];
        const result = userEventsReducer(undefined, {});

        expect(result).toEqual(expected);
    })

    it('should return state with user events', () => {
        const initialState = [];
        const expected = mockUserEvents;

        const result = userEventsReducer(initialState, Actions.loadEvents(userEvents))
        expect(result).toEqual(expected)
    })

    it(`should add an event to a user's calendar`, () => {
        const initialState = userEvents;
        const expected = mockUpdatedEvents;

        const result = userEventsReducer(initialState, Actions.addEvent(mockEvent))
        expect(result).toEqual(expected)
    })    

})