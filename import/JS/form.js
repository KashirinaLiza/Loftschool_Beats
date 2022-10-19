const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
    field.removeClass("error");
    if (field.val().trim() === "") {
      field.addClass("error");
    }
  })

  const errorFields = form.find(".error");
  return errorFields.length === 0;
}

$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const street = form.find("[name='street']");
  const house = form.find("[name='house']");
  const sector = form.find("[name='sector']");
  const flat = form.find("[name='flat']");
  const floor = form.find("[name='floor']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal")

  const isValid = validateFields(form, [name, phone, street, house, sector, flat, floor, to]);

    if (isValid) {
    $.ajax({
      url: 'https://webdev-api.loftschool.com/sendmail',
      method: "POST",
      data: {
        name: name.val(),
        phone: phone.val(),
        street: street.val(),
        house: house.val(),
        sector: sector.val(),
        flat: flat.val(),
        floor: floor.val(),
        to: to.val()
      },
      success: data => {
        content.text(data.message)
        $.fancybox.open({
          src: "#modal",
          type: "inline"
        });
      },
      error: data => {
        const message = data.responseJSON.message;
        content.text(message);
        modal.addClass("error-modal");
        $.fancybox.open({
          src: "modal",
          type: "inline"
        });
      }
    });
  }
})
