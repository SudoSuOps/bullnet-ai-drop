# Node workflow: detailed sequence

The website shows a five-step illustrative workflow. This is the fuller eight-step sequence it summarizes. It is a proposed design, not a description of a tested or deployed system.

Example question from a project manager on a 600-unit project: "Which electrical submittals are outstanding, and what changed in the latest drawing revision?"

1. The project manager asks through the private AI office.
2. The system retrieves the project records he is permitted to see.
3. A specialized agent compares the approved document revisions.
4. The Node processes the supported work on site.
5. Source references and differences are assembled.
6. Validation flags unsupported claims and missing evidence.
7. The project manager receives a report he can review.
8. A person decides what to issue or change.

Comparing documents does not replace engineering review.

## Hardware status and evidence

Statuses used on the site are defined in `docs/security/trust-rules.md`. To move a unit to "In operation", put on file: a photo of the unit running, the system output showing the hardware (for a graphics card, `nvidia-smi`), the operating system and driver, and the power arrangement. Then change its `status` in `content/node.ts`; the "Hardware we operate" group appears on the page automatically.

Open verification items as of 2026-11-14:

- ZimaCube Pro: graphics card model, whether it is the low-profile small-form-factor edition, and whether it is installed and running. The chassis supplies about 75W per slot with no auxiliary power and limits card size, so only a slot-powered low-profile card fits.
- ZimaBoard 2 with RTX 5080: slot is PCIe 3.0 x4; power delivery to the card and slot, cooling, driver and operating system. A vendor tutorial for RTX 50-series drivers on ZimaOS shows a possible driver path, not a working BullNet configuration.
- ZimaBoard 2 compact server and Jetson edge box: a running photo and the models served.
