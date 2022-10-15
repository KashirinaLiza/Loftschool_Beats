$(".reviews__switcher-link").click((e)=> {
  e.preventDefault();

  const $this = $(e.CurrentTarget);
  const CurrentItem = $this.closest(".reviews__switcher-item");

  CurrentItem.addClass("active").siblings().removeClass("active");
});