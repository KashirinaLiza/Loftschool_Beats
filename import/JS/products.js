const mesureWidth = item => {
  const screenWidth = $(window).width();
  const container = item.closest(".products__menu");
  const titlesBlocks = container.find(".products__main-title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;
  
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    return screenWidth - titlesWidth;
  } else {
    return 500;
  }
  
};

const closeEveryItemInContainer = container => {
  const items = container.find(".products__menu-item");
  const content = container.find(".products__menu-content");

  items.removeClass("active");
  content.width(0);
}

const openItem = item => {
  const hiddenContent = item.find(".products__menu-content");
  const reqWidth = mesureWidth(item);

  item.addClass("active");
  hiddenContent.width(reqWidth);
}

$(".products__menu-title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products__menu-item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".products__menu");

  if (itemOpened) {
  closeEveryItemInContainer(container)
  } else {
    closeEveryItemInContainer(container)
    openItem(item);
  }
});

$(".products__menu-close").on("click", e => {
  e.preventDefault();

  closeEveryItemInContainer($('.products__menu'));
})