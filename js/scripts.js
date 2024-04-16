WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
header = document.getElementById('header')


document.addEventListener('DOMContentLoaded', function () {
	// Supported blockchains
	let supportedBlockchains = document.querySelector('.supported_blockchains .swiper')

	if (supportedBlockchains) {
		new Swiper('.supported_blockchains .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.item')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.item')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		})
	}


	// Feedback
	let feedback = document.querySelector('.feedback .swiper')

	if (feedback) {
		new Swiper('.feedback .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			initialSlide: 1,
			slidesPerView: 1,
			breakpoints: {
				0: {
					spaceBetween: 16
				},
				1024: {
					spaceBetween: 24
				}
			}
		})
	}


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Roadmap
	initRoadmapSliders()
})


window.addEventListener('scroll', () => {
    window.scrollY >= header.offsetHeight
        ? header.classList.add('fixed')
        : header.classList.remove('fixed')
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Roadmap
		initRoadmapSliders()


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})




// Roadmap
roadmapSliders = []

function initRoadmapSliders() {
	if ($(window).width() > 1279) {
		if ($('.roadmap .list').length) {
			$('.roadmap .list > *').addClass('swiper-slide')
			$('.roadmap .list').addClass('swiper-wrapper').removeClass('list')

			$('.roadmap .swiper').each(function (i) {
				$(this).addClass('roadmap_s' + i)

				let options = {
					loop: false,
					speed: 750,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					lazy: true,
					spaceBetween: 24,
					slidesPerView: 1
				}

				roadmapSliders.push(new Swiper('.roadmap_s' + i, options))
			})
		}
	} else {
		roadmapSliders.forEach(element => element.destroy(true, true))

		roadmapSliders = []

		$('.roadmap .swiper-wrapper').addClass('list').removeClass('swiper-wrapper')
		$('.roadmap .list > *').removeClass('swiper-slide')
	}
}