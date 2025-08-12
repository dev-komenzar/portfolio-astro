import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import { cards } from './card-list'
import styles from './deck.module.scss'

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

const from = () => ({
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
	const [gone] = useState(() => new Set())
	// Create a bunch of springs using the helpers above
	const [springs, api] = useSprings(cards.length, (i) => ({
		...to(i),
		from: from(),
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
