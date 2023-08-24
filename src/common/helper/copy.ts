export const copy =
  (text: string | number, successMessage = "متن با موفقیت کپی شد.") =>
  async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(String(text));
    }
  };
