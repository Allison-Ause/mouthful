
export default function createRecipeForm(form, { handleAddRecipe }) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const sentence = formData.get('sentence');

        await handleAddRecipe(sentence);

        form.reset();
    });

    return () => {};
}