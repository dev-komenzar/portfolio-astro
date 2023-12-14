import { Icon } from '@iconify/react'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import type { ReactNode } from 'react'
import { Children, useState } from 'react'
import styles from './deck.module.scss'

// todo: VStackコンポーネントを作る
type VStackProps = { children: ReactNode; className?: string }
function VStack(params: VStackProps) {
	return (
		<div className={styles.vstack}>
			{Children.map(params.children, (child: ReactNode) => child)}
		</div>
	)
}

type LiProps = { children: ReactNode; className?: string }
function Li(props: LiProps) {
	return <li className={styles.li}>{props.children}</li>
}

function Infobox() {
	return (
		<Icon
			className={styles.icon}
			icon='pixelarticons:info-box'
			color='#38A169'
			width='32px'
		/>
	)
}
function Checkbox() {
	return (
		<Icon
			className={styles.icon}
			icon='pixelarticons:checkbox'
			color='#38A169'
			width='32px'
		/>
	)
}

function WhatIsKamodigi() {
	return (
		<div className={styles.cardBody}>
			<h2>
				鴨川デジタル
				<wbr />
				相談所
			</h2>
			<ul className={styles.cardList}>
				<Li>
					<Infobox />
					京都を中心に活動
				</Li>
				<Li>
					<Checkbox />
					軽量なサイト作成
				</Li>
				<Li>
					<Checkbox />
					あらゆるデザインをコーディングします
				</Li>
				<Li>
					<Checkbox />
					Web・ネイティブ アプリ開発
				</Li>
				<Li>
					<Checkbox />
					ライブ配信のお手伝い
				</Li>
			</ul>
			<p>幅広く相談お受けします</p>
		</div>
	)
}

function TechInfo() {
	return (
		<div className={styles.cardBody}>
			<h2>あつかう技術</h2>
			<ul className={styles.cardList}>
				<Li>
					<Checkbox />
					React, Next.js, SvelteをもちいたWebアプリ開発
				</Li>
				<Li>
					<Checkbox />
					TypeScript で型安全な開発
				</Li>
				<Li>
					<Checkbox />
					AstroをもちいたWebサイト作成
				</Li>
				<Li>
					<Checkbox />
					アニメーションも得意
				</Li>
				<Li>
					<Checkbox />
					React Native, Expo ネイティブアプリ開発
				</Li>
				<Li>
					<Checkbox />
					Electron を用いたデスクトップアプリ開発
				</Li>
			</ul>
		</div>
	)
}

function TechInfoPage2() {
	return (
		<div className={styles.cardBody}>
			<ul className={styles.cardList}>
				<Li>
					<Checkbox />
					WordPressサイトの補修
				</Li>
				<Li>
					<Checkbox />
					WordPressから使いやすいCMSへ移行サポート
				</Li>
				<Li>
					<Checkbox />
					Notion など業務効率化のご提案
				</Li>
				<Li>
					<Checkbox />
					Go, Elm, Raspberry Pi...
				</Li>
			</ul>
		</div>
	)
}

function Houdouji() {
	return (
		<>
			<div className={styles.houdoujiThumb}></div>
			<VStack>
				<p>サイト製作</p>
				<h2>
					実験寺院・寳幢寺<span>（ホウドウジ）</span>
				</h2>
				<p>
					日本仏教徒協会様が運営する新しいあり方を模索するお寺、ホウドウジ。サイトを作成させていただきました。
				</p>
			</VStack>
		</>
	)
}

function GarageSale() {
	return (
		<div className={styles.cardBody}>
			<h2>ガレージセール</h2>
			<p>
				開発中のサービス。個人が直接マーケットに結び付けられる時代に、コミュニティの中の信頼をベースとするサービスを作っていきます。開発者・モニター募集中。
			</p>
		</div>
	)
}

const cards = [
	{ component: <GarageSale />, key: 'garage-sale' },
	{ component: <Houdouji />, key: 'houdouji' },
	{ component: <TechInfoPage2 />, key: 'my-tech-page2' },
	{ component: <TechInfo />, key: 'my-tech' },
	{ component: <WhatIsKamodigi />, key: 'my-profile' },
]

/**
 * These two are just helpers, they curate spring data,
 * values that are later being interpolated into css
 */
const to = (i: number) => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100,
})

const from = (_i: number) => ({
	x: 0,
	rot: 0,
	scale: 1.2,
	y: -10,
})

/** This is being used down there in the view,
 * it interpolates rotation and scale into a css transform
 */
const trans = (r: number, s: number) =>
	`perspective(1000px) rotateX(8deg) rotateY(${
		r / 10
	}deg) rotateZ(${r}deg) scale(${s})`

function Deck() {
	// The set flags all the cards that are flicked out
	const [gone, _setGone] = useState(() => new Set())
	// Create a bunch of springs using the helpers above
	const [springs, api] = useSprings(cards.length, (i) => ({
		...to(i),
		from: from(i),
	}))
	// Create a gesture, we're interested in down-state,
	// delta (current-pos - click-pos), direction and velocity
	const bind = useDrag(
		({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
			console.log('Triggered!!')

			// If you flick hard enough it should trigger the card to fly out
			const trigger = velocity[0] > 0.2
			// Direction should either point left or right
			const dir = xDir < 0 ? -1 : 1

			// If button/finger's up and trigger velocity is reached,
			// we flag the card ready to fly out
			if (!down && trigger) {
				gone.add(index)
			}

			// We're only interested in
			// changing spring-data for the current spring
			api.start((i) => {
				if (index !== i) {
					return
				}

				const isGone = gone.has(index)
				// When a card is gone it flys out left or right,
				// otherwise goes back to zero
				const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
				// How much the card tilts,
				// flicking it harder makes it rotate faster
				const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0)
				const scale = down ? 1.08 : 1 // Active cards lift up a bit
				return {
					x,
					rot,
					scale,
					delay: undefined,
					config: {
						friction: 50,
						tension: down ? 800 : isGone ? 200 : 500,
					},
				}
			})
			if (!down && gone.size === cards.length) {
				setTimeout(() => {
					gone.clear()
					api.start((i) => to(i))
				}, 600)
			}
		},
	)
	// Now we're just mapping the animated values to our view, that's it.
	// Btw, this component only renders once. :-)
	const handleTouch = () => {
		console.log('Touch Detected!')
	}
	return (
		<>
			{springs.map(({ x, y, rot, scale }, i) => (
				<animated.div
					className={styles.card}
					key={i}
					style={{ x, y }}
					onTouchStart={handleTouch}
				>
					{/* This is the card itself,
					we're binding our gesture to it (and inject its index
					so we know which is which) */}
					<animated.div
						{...bind(i)}
						style={{
							transform: interpolate([rot, scale], trans),
						}}
					>
						{cards[i].component}
					</animated.div>
				</animated.div>
			))}
		</>
	)
}

export default function App() {
	return (
		<div className={styles.container}>
			<Deck />
		</div>
	)
}
