import { shallowMount, mount } from "@vue/test-utils";
import Vuex from "vuex";
import SearchBar from "../components/SearchBar.vue";

import { describe, it, expect } from "vitest";
import { workflowBlocksMock } from "../dataMock";

describe("SearchBar.vue", () => {
  it("renders correctly", async () => {
    const wrapper = mount(SearchBar, {
      propsData: {
        flowBlockList: workflowBlocksMock,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("by default displays all available blocks are displays in the options list", () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        flowBlockList: workflowBlocksMock,
      },
    });

    wrapper.find("[test-id='search-bar--wrapper']").trigger("click");
    const options = wrapper.findAll("[test-id='search-bar--list-item']");

    expect(options.length).toEqual(workflowBlocksMock.length);
  });

  it("only block matching search query is displayed when search query entered", async () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        flowBlockList: workflowBlocksMock,
      },
    });
    await wrapper
      .find("[test-id='search-bar--input']")
      .setValue(workflowBlocksMock[0].name);

    const listItems = wrapper.findAll("[test-id='search-bar--list-item']");

    expect(listItems.length).toEqual(1);
  });

  it("emits add-block event with correct payload on selecting block", async () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        flowBlockList: workflowBlocksMock,
      },
    });
    await wrapper
      .find("[test-id='search-bar--input']")
      .setValue(workflowBlocksMock[0].name);

    wrapper.find("[test-id='search-bar--list-item']").trigger("mousedown");
    expect(wrapper.emitted()["add-block"]).toEqual([[workflowBlocksMock[0]]]);
  });
});
