export const boundTabs = (tabsSelector) => {
  //const tabs = document.querySelector(tabsSelector);
	const tabs = tabsSelector;
	const headingsContainer = tabs.querySelector('.tabs-headings');
  const headings = headingsContainer.querySelectorAll('.heading');
	const contentContainer = tabs.querySelector('.tabs-content')
  
	
	//const contents = contentContainer.querySelectorAll('.content');
	const contents = [...contentContainer.children]

	//console.log(contents)

  headings.forEach((heading, index) => {
    heading.addEventListener('click', () => {
      headings.forEach(item => {
        item.classList.remove('selected')
      })
      heading.classList.add('selected')
      contents.forEach(item => {
        item.classList.remove('show')
      })
      contents[index].classList.add('show')
    })
  })
}