import { Icon } from '@iconify/react'
import type { ReactNode } from 'react'
import { Children } from 'react'
import styles from './deck.module.scss'

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

function Kamodigi() {
	return (
		<div className={styles.cardBody}>
			<h2 className={styles.dotFont}>
				鴨川
				<wbr />
				<span className={styles.middle}>デジタル</span>
				<wbr />
				相談所
			</h2>
		</div>
	)
}

function WhatIsKamodigi() {
	return (
		<div className={styles.cardBody}>
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

export const cards = [
	{ component: <GarageSale />, key: 'garage-sale' },
	{ component: <Houdouji />, key: 'houdouji' },
	{ component: <TechInfoPage2 />, key: 'my-tech-page2' },
	{ component: <TechInfo />, key: 'my-tech' },
	{ component: <WhatIsKamodigi />, key: 'my-profile' },
	{ component: <Kamodigi />, key: 'kamodigi' },
]
