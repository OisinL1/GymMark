/* eslint-disable func-names */
export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About GymMark",
      };
      return h.view("about-view", viewData);
    },
  },
};
