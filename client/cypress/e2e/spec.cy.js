describe('HomePage', () => {
  it('Renders correctly', () => {
    cy.visit('http://localhost:3000/');
  });

  it('Renders correctly', () => {
    cy.visit('http://localhost:3000/');
  });
});

describe('Categories  page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/electronic');
    cy.visit('http://localhost:3000/mensClothing');
    cy.visit('http://localhost:3000/womensClothing');
    cy.visit('http://localhost:3000/jwellery');
  });
});

describe('product view page', () => {
  it('all product view pages rendering', () => {
    cy.visit('http://localhost:3000/productView/12');
    cy.visit('http://localhost:3000/productView/1');
    cy.visit('http://localhost:3000/productView/15');
    cy.visit('http://localhost:3000/productView/8');
  });
});

describe('sign in page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/signin');
  });
});

describe('Register page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/register');
  });
});

describe('profile page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/profile');
  });
});

describe('Edit profile page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/editProfile');
  });
});

describe('Order history page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/orderHistory');
  });
});

describe('cart page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/cart');
  });
});

describe('Check out page', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/checkout');
  });
});
