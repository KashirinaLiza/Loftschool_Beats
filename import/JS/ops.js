const sections = $("section");
const display = $(".maincontent");
const sidemenu = $(".fixed-menu");


let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  return sectionEq * -100;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--white";

  if (menuTheme === "white") {
    sidemenu.addClass(activeClass);
  } else {
    sidemenu.removeClass(activeClass);
  }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
  if(inScroll === false) {
    inScroll = true;
  
  const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });

  sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
 

  setTimeout(() => {
    inScroll = false;

    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const sidemenu = $(".fixed-menu");

    sidemenu.find(".fixed-menu__item").eq(sectionEq).addClass("active").siblings().removeClass("active");


    if (menuTheme === "white") {
      sidemenu.addClass("fixed-menu--white");
    } else {
      sidemenu.removeClass("fixed-menu--white");
    }
  }, 1300);
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();


  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index())
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index())
  }

}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea") {

  switch (e.keyCode) {
    case 38:
      scrollViewport("prev");
      break;

    case 40:
      scrollViewport("next");
      break;
  }}
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
})

$("body").swipe({
  swipe:function(event, direction) {
    const scroller = viewportScroller();
    let scrollDirection = ""; 

    if (direction === "up") scrollDirection = "next";
    if (direction === "down") scrollDirection = "prev";

    scroller[scrollDirection]();
  }
});