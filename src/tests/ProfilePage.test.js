import React from "react";
import { shallow } from "enzyme";
import { ProfilePage, mapStateToProps } from "../containers/ProfilePage/";
import { mockProfile, mockUser, mockUserEvents } from "./testMocks";

describe("PROFILE PAGE", () => {
  it("should match the snapshot", () => {
    const wrapper = shallow(
      <ProfilePage
        currentPage={mockProfile}
        user={mockUser}
        userEvents={mockUserEvents}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe("mapStateToProps", () => {
    it("should have access to currentUser", () => {
      const mockStore = {
        currentPage: {}
      };
      const expected = { ...mockStore };
      const result = mapStateToProps(mockStore);
      expect(result).toEqual(expected);
    });
  });
});
