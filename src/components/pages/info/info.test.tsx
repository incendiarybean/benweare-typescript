import React from "react";
import { Icon } from "src/components";
import { act, render, screen } from "@testing-library/react";
import Component from "./";

test("Name and image displays", () => {
    render(<Component Icon={Icon} />);
    const name = screen.getByText(/Ben Weare/i);
    expect(name).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
});

test("Dropdown display of knowledge works.", () => {
    render(<Component Icon={Icon} />);

    const expandButton = screen.getByText(/Languages & Experience/i);
    const knowledgeTitle = screen.getByText(/Services\/Environment/i);

    expect(knowledgeTitle).toHaveProperty("hidden");

    act(() => expandButton.click());

    expect(knowledgeTitle).toBeInTheDocument();
});
