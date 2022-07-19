import { fireEvent, render, screen } from "@testing-library/react";
import { Menu } from ".";
import { Product } from "../../types/interfaces";

describe("Menu with GHG Type selector", () => {
  const products: Product[] = [
    {
      description:
        "Dry-air mixing ratio of methane for cloud-free observations with a spatial resolution of 7x7km2 observed at about 13:30 local solar time from spectra measured by TROPOMI, total column",
      name: "methane",
      product_variable: "methane_mixing_ratio_bias_corrected",
    },
    {
      description:
        "Atmospheric content of carbon monoxide in `mol m¯²`, total column",
      name: "carbonmonoxide",
      product_variable: "carbonmonoxide_total_column",
    },
    {
      description: "Atmospheric content of ozone in `mol m¯²`, total column",
      name: "ozone",
      product_variable: "ozone_total_vertical_column",
    },
    {
      description:
        "Nitrogen dioxide tropospheric column with a spatial resolution of 7x3.5km2 observed at about 13:30 local solar time from spectra measured by TROPOMI, total column",
      name: "nitrogendioxide",
      product_variable: "nitrogendioxide_tropospheric_column",
    },
  ];
  it("Allows to select one GHG type by name", () => {
    const selectProduct = jest.fn();
    render(<Menu products={products} onProductSelect={selectProduct} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "carbonmonoxide" } });

    const firstOption = screen.getByRole("option", {
      name: "carbonmonoxide",
    }) as HTMLOptionElement;

    expect(firstOption.selected).toBe(true);
    expect(selectProduct).toBeCalledWith("carbonmonoxide");
  });
});
