import { describe, expect, it } from "vitest";
import { formatWhatsapp, getWhatsappUrl } from "./company";

describe("company helpers", () => {
  it("formats whatsapp number in brazilian pattern", () => {
    expect(formatWhatsapp("+5532991392808")).toBe("(32) 99139-2808");
  });

  it("builds whatsapp URL with encoded message", () => {
    const url = getWhatsappUrl("Ola teste");
    expect(url).toContain("https://wa.me/");
    expect(url).toContain("text=Ola%20teste");
  });
});
