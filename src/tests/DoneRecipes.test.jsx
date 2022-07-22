import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import DONE_RECIPES_STORAGE from './mocks/localStorage/DONE_RECIPES_STORAGE';
import doneRecipesTestsIds from './mocks/constants/doneRecipesTestsIds';

const {
  FILTER_ALL_BTN_TESTID,
  FILTER_FOOD_BTN_TESTID,
  DRINK_FILTER_BTN_TESTID,
  IMAGE_CARD_TESTID,
  CATEGORY_TET_TESTID,
  NAME_TESTID,
  DATE_TESTID,
  SHARE_BTN,
  SARDINE_TAG_TESTID,
} = doneRecipesTestsIds;

const fakeSetUp = async () => {
  const container = renderWithRouter(DoneRecipes, {
    path: '/done-recipes',
    route: '/done-recipes',
  });

  await waitFor(() => screen.getAllByRole('img'));
  return container;
}

describe('Testes da página de receitas feitas', () => {
  afterEach(() => cleanup());
  localStorage.setItem(
    'doneRecipes',
    JSON.stringify(DONE_RECIPES_STORAGE)
  );
  test('1. Com duas receitas completas, busca elementos pelos test-ids e confirma que estão disponíveis', async () => {
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
    const tagCard = screen.getByTestId(SARDINE_TAG_TESTID);

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
    expect(tagCard).toBeInTheDocument();
  });
  test('2. clicado no botão de compartilhar, o alerta se torna visível, e o clipboard copia o endereço correto', async () => {
    const newClip = jest.fn()
    global.navigator.clipboard = { writeText: newClip };
    jest.spyOn(navigator.clipboard, 'writeText');
    await fakeSetUp();

    const URLLocation = `${window.location.origin}/done-recipes`;

    const shareBtnOne = screen.getByTestId(SHARE_BTN(0));
    const shareBtnTwo = screen.getByTestId(SHARE_BTN(1));

    userEvent.click(shareBtnOne);

    const alert1 = screen.getByRole('alert');

    expect(newClip).toHaveBeenCalledWith(URLLocation);
    expect(alert1).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 3500));

    expect(alert1).not.toBeInTheDocument();

    userEvent.click(shareBtnTwo);

    const alert2 = screen.getByRole('alert')

    expect(newClip).toHaveBeenCalledWith(URLLocation);
    expect(alert2).toBeInTheDocument();
  });
  test('3. Testa a funcionalidade dos botões de filtro', async () => {
    await fakeSetUp();
    const filterBtn = screen.getByTestId(FILTER_ALL_BTN_TESTID);
    const foodBtn = screen.getByTestId(FILTER_FOOD_BTN_TESTID);
    const drinkBtn = screen.getByTestId(DRINK_FILTER_BTN_TESTID);

    const imgCardOne = screen.getByTestId(IMAGE_CARD_TESTID(0));
    const imgCardTwo = screen.getByTestId(IMAGE_CARD_TESTID(1));

    expect(imgCardOne).toBeInTheDocument();
    expect(imgCardTwo).toBeInTheDocument();

    userEvent.click(foodBtn);

    expect(imgCardOne).toBeInTheDocument();
    expect(imgCardTwo).not.toBeInTheDocument();

    userEvent.click(filterBtn);

    expect(imgCardOne).toBeInTheDocument();
    expect(imgCardTwo).toBeInTheDocument();

    userEvent.click(drinkBtn);

    expect(imgCardOne).not.toBeInTheDocument();
    expect(imgCardTwo).toBeInTheDocument();
  });
  test('4. Se clicado no card, o usuário é redirecionado para página de detalhes da receita', async () => {
    const { history } = await fakeSetUp();

    const imgCardOne = screen.getByTestId(IMAGE_CARD_TESTID(0));

    userEvent.click(imgCardOne);

    expect(history.location.pathname).toBe('/foods/53061');
  });
});
