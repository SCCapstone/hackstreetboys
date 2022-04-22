import axios from "axios";

import { BASE_URL, fetchUsers } from "./utils";

jest.mock("axios");

describe("fetchUsers", () => {
  describe("when API call is successful", () => {
    it("should return users list", async () => {
      // given
      const users = [
        { id: 1, name: "Adam" },
        { id: 2, name: "Andrew" },
      ];
      axios.get.mockResolvedValueOnce(users);

      // when
      const result = await fetchUsers();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/user`);
      expect(result).toEqual(users);
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", async () => {
      // given
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await fetchUsers();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/user`);
      expect(result).toEqual([]);
    });
  });
});