/// <reference types="cypress" />

describe('template spec', () => {
  const NEW_TASK = "Fatura edemesin yapıldı";
  const OVER_LIMIT_TASK = 'Bu görev metni yirmi beş karakterden kesinlikle daha uzundur.';
  beforeEach(() => {
    cy.visit("/")
  })
  it("Uygulama yüklendiğinde varsayılan görevleri ve input durumun göster", () => {
    cy.get('[data-cy="new-todo-input"]').should("have.value", "");
    cy.get('[data-cy="add-todo-button"]').should("be.disabled");
    cy.get('[data-cy="todo-list"]').children().should("have.length", 2)

    cy.get('[data-cy="todo-list"]').children().first().should("contain", "Marketi ziyaret et")
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="todo-text"]').should("not.have.class", "line-through")

  })

  it("inputta yeni görev yazılıp Ekle butonu ile eklendiğinde liste güncelleniyor mu", function () {
    cy.get('[data-cy="new-todo-input"]').type(NEW_TASK)
    cy.get('[data-cy="add-todo-button"]').should("be.enabled").click();
    cy.get('[data-cy="todo-list"]').children().should("have.length", 3)
    cy.get('[data-cy="todo-list"]').children().last().should("contain", NEW_TASK)
  })
  it("Tamamla butonuna tıklandığında görev butonu durumu değişir ve metin çizilir", () => {
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="toggle-button"]').should("exist").click();
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="todo-text"]').should("have.class", "line-through")
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="toggle-button"]').should("contain", "Yenile")
  })
  it("Sil butonuna tıklandığında görev listeden kaldırılıyor mu", () => {
    cy.get('[data-cy="todo-list"]').children().should("have.length", 2)
    cy.get('[data-cy="todo-list"]').children().first().should("contain", "Marketi ziyaret et").find('[data-cy="delete-button"]').click();
    cy.get('[data-cy="todo-list"]').children().should("have.length", 1)
    cy.get('[data-cy="todo-list"]').children().first().should("contain", "Test senaryolarını yaz")
  })
  it("Input alanına  25 karakterden fazla girilirse sadece ilk 25 karakteri yazar ve geri kalan karakterleri yazmaz", () => {
    cy.get('[data-cy="new-todo-input"]').should("have.attr", "maxLength", "25")
    cy.get('[data-cy="new-todo-input"]').type(OVER_LIMIT_TASK)
    cy.get('[data-cy="new-todo-input"]').should("have.value", OVER_LIMIT_TASK.substring(0, 25))
    cy.get('[data-cy="add-todo-button"]').should("not.be.disabled")
    cy.get('[data-cy="add-todo-button"]').click();
    cy.get('[data-cy="todo-list"]').children().should("have.length", 3)
  })
  it("Eğer ki Inpu alanı boş olursa buton disabled mı", () => {
    cy.get('[data-cy="new-todo-input"]').type(" ")
    cy.get('[data-cy="add-todo-button"]').should("be.disabled")
  })
  it("Input alanı boşluk girilip butona tıklandıgında ekleme yapıyor mu?", () => {
    cy.get('[data-cy="new-todo-input"]').type(" ")
    cy.get('[data-cy="add-todo-button"]').should("be.disabled")
    cy.get('[data-cy="todo-list"]').children().should("have.length", 2)

  })
  it("Kullanıcı enter tuşuna bastığında ekleme yapıyor mu", () => {
    cy.get('[data-cy="new-todo-input"]').type(`${NEW_TASK}{enter}`)
    cy.get('[data-cy="todo-list"]').children().should("have.length", 3)
  })
  it("Kullanıcı enter tuşuna bastığında boş bir string eklemesi yapıyor mu", () => {
    cy.get('[data-cy="new-todo-input"]').type(`{enter}`)
    cy.get('[data-cy="todo-list"]').children().should("have.length", 2)
  })
  it("Aynı görev tekrar eklenebiliyor mu", () => {
    cy.get('[data-cy="new-todo-input"]').type(NEW_TASK);
    cy.get('[data-cy="add-todo-button"]').click();
    cy.get('[data-cy="new-todo-input"]').type(NEW_TASK);
    cy.get('[data-cy="add-todo-button"]').click();
    cy.get('[data-cy="todo-list"]').children().should("have.length", 4);
  });
  it("Tamamlanan görev yenilendikten sonra normal duruma döner mi", () => {
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="toggle-button"]').click();
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="toggle-button"]').click();
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="todo-text"]').should("not.have.class", "line-through");
    cy.get('[data-cy="todo-list"]').children().first().find('[data-cy="toggle-button"]').should("contain", "Tamamla");
  });
  it("Input temizlendiğinde buton disabled olur", () => {
    cy.get('[data-cy="new-todo-input"]').type(NEW_TASK);
    cy.get('[data-cy="add-todo-button"]').should("be.enabled")
    cy.get('[data-cy="new-todo-input"]').clear();
    cy.get('[data-cy="add-todo-button"]').should("not.be.enabled")

  });
  it("Todo liste görev eklendiğinde input alanı temizleniyor mu", () => {
    cy.get('[data-cy="new-todo-input"]').type(NEW_TASK);
    cy.get('[data-cy="add-todo-button"]').should("be.enabled")
    cy.get('[data-cy="add-todo-button"]').click();
    cy.get('[data-cy="todo-list"]').children().should("have.length", 3);
    cy.get('[data-cy="new-todo-input"]').should("have.value", "")
  });
  it("Eksik data-cy attribute kontrolü", () => {
    cy.get('[data-cy="new-todo-input"]').should('exist');
    cy.get('[data-cy="add-todo-button"]').should('exist');
    cy.get('[data-cy="todo-list"]').should('exist');
  });
  it("Çok sayıda görev eklenebiliyor mu", () => {
    const Arr = Array.from({ length: 20 }, (_, i) => `${i + 1}. Görev`);
    Arr.forEach((item) => {
      cy.get('[data-cy="new-todo-input"]').type(item);
      cy.get('[data-cy="add-todo-button"]').click();
    })
    cy.get('[data-cy="todo-list"]').children().should("have.length", 22);
  })
})