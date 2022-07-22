import { screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import FavoriteRecipes from "../pages/FavoriteRecipes";
import DONE_RECIPES_STORAGE from "./mocks/localStorage/DONE_RECIPES_STORAGE";
import doneRecipesTestsIds from "./mocks/constants/doneRecipesTestsIds";
import { RuleTester } from "eslint";

const {
  FILTER_ALL_BTN_TESTID,
  FILTER_FOOD_BTN_TESTID,
  DRINK_FILTER_BTN_TESTID,
  IMAGE_CARD_TESTID,
  CATEGORY_TET_TESTID,
  NAME_TESTID,
  DATE_TESTID,
  SHARE_BTN,
} = doneRecipesTestsIds;

const fakeSetUp = async () => {
  const container = renderWithRouter(FavoriteRecipes, {
    path: "/favorite-recipes",
    route: "/favorite-recipes",
  });

  await waitFor(() => screen.getAllByRole("img"));
  return container;
};

describe("Testes das receitas favoritadas", () => {
  afterEach(() => cleanup());
  localStorage.setItem("favoriteRecipes", JSON.stringify(DONE_RECIPES_STORAGE));
  test("1. Com duas receitas favoritadas, busca elementos pelos test-ids e confirma que estão disponíveis", async () => {
    await fakeSetUp();
    const filterBtn = screen.getByTestId(FILTER_ALL_BTN_TESTID);
    const foodBtn = screen.getByTestId(FILTER_FOOD_BTN_TESTID);
    const drinkBtn = screen.getByTestId(DRINK_FILTER_BTN_TESTID);
    const imgCardOne = screen.getByTestId(IMAGE_CARD_TESTID(0));
    const imgCardTwo = screen.getByTestId(IMAGE_CARD_TESTID(1));
    const categoryCardOne = screen.getByTestId(CATEGORY_TET_TESTID(0));
    const categoryCardTwo = screen.getByTestId(CATEGORY_TET_TESTID(1));
    const nameCardOne = screen.getByTestId(NAME_TESTID(0));
    const nameCardTwo = screen.getByTestId(NAME_TESTID(1));
    const dateCardOne = screen.getByTestId(DATE_TESTID(0));
    const dateCardTwo = screen.getByTestId(DATE_TESTID(1));
    const shareBtnOne = screen.getByTestId(SHARE_BTN(0));
    const shareBtnTwo = screen.getByTestId(SHARE_BTN(1));
    const dislike = screen.getByTestId('0-horizontal-favorite-btn');
    const dislikeTwo = screen.getByTestId('1-horizontal-favorite-btn');


    expect(filterBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(imgCardOne).toBeInTheDocument();
    expect(imgCardTwo).toBeInTheDocument();
    expect(categoryCardOne).toBeInTheDocument();
    expect(categoryCardTwo).toBeInTheDocument();
    expect(nameCardOne).toBeInTheDocument();
    expect(nameCardTwo).toBeInTheDocument();
    expect(dateCardOne).toBeInTheDocument();
    expect(dateCardTwo).toBeInTheDocument();
    expect(shareBtnOne).toBeInTheDocument();
    expect(shareBtnTwo).toBeInTheDocument();
    expect(dislike).toBeInTheDocument();
    expect(dislikeTwo).toBeInTheDocument();
  });
  test("2. clicado no botão de compartilhar, o alerta se torna visível, e o clipboard copia o endereço correto", async () => {
    const myFunc = jest.fn();
    global.navigator.clipboard = { writeText: myFunc };
    jest.spyOn(navigator.clipboard, "writeText");
    await fakeSetUp();

    const shareBtnOne = screen.getByTestId(SHARE_BTN(0));
    const shareBtnTwo = screen.getByTestId(SHARE_BTN(1));

    userEvent.click(shareBtnOne);

    const alert = await screen.findByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(myFunc).toHaveBeenCalledWith(
      `${window.location.origin}/foods/53061`
    );

    await new Promise((r) => setTimeout(r, 3500));

    expect(alert).not.toBeInTheDocument();

    userEvent.click(shareBtnTwo);
    const alert2 = screen.getByRole("alert");

    expect(alert2).toBeInTheDocument();
    expect(myFunc).toHaveBeenCalledWith(
      `${window.location.origin}/drinks/11003`
    );

  });
  test("3. Testa a funcionalidade dos botões de filtro", async () => {
    await fakeSetUp();
    const filterBtn = screen.getByTestId(FILTER_ALL_BTN_TESTID);
    const foodBtn = screen.getByTestId(FILTER_FOOD_BTN_TESTID);
    const drinkBtn = screen.getByTestId(DRINK_FILTER_BTN_TESTID);

    const SARDINE = screen.queryByText(/sardine/i);
    const NEGRONI = screen.queryByText(/negroni/i);

    expect(SARDINE).toBeInTheDocument();
    expect(NEGRONI).toBeInTheDocument();

    userEvent.click(foodBtn);

    expect(SARDINE).toBeInTheDocument();
    expect(NEGRONI).not.toBeInTheDocument();

    userEvent.click(filterBtn);
    const SARDINE2 = screen.queryByText(/sardine/i);
    const NEGRONI2 = screen.queryByText(/negroni/i);

    expect(SARDINE2).toBeInTheDocument();
    expect(NEGRONI2).toBeInTheDocument();

    userEvent.click(drinkBtn);

    const SARDINE3 = screen.queryByText(/sardine/i);
    const NEGRONI3 = screen.queryByText(/negroni/i);

    expect(SARDINE3).not.toBeInTheDocument();
    expect(NEGRONI3).toBeInTheDocument();
  });
  test("4. Se clicado no card, o usuário é redirecionado para página de detalhes da receita", async () => {
    const { history } = await fakeSetUp();

    const imgCardOne = screen.getByTestId(IMAGE_CARD_TESTID(0));

    userEvent.click(imgCardOne);

    expect(history.location.pathname).toBe("/foods/53061");
  });
  test('5. Testa se o botão de desfavoritar atualiza o localStorage, e a lista de favoritos é atualizada', async () => {
    await fakeSetUp();

    const dislike = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(dislike);
 
    const updatedStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(updatedStorage.some((rec) => rec.id === '53061')).toBe(false);
    expect(dislike).not.toBeInTheDocument();
  })
});
