# Next.jsでポートフォリオを作成しました！

![]()

## 挨拶
はじめまして！  
Next.jsを使用してポートフォリオ用のwebアプリケーションを作成しましたので，紹介させていただきます．

## アプリ概要
旅行計画の作成を楽にする「spots viewer」というアプリを作成しました．
- 旅行で訪れたい観光地・店などを検索できる
- 候補に追加したスポットを地図上に一覧表示させることができる
- スポット間の移動時間を検索することができる

## 制作背景
私は旅行が好きでよく旅行をします．  
旅行の計画を立てる際，旅行先にある良さげな観光スポットやレストラン，カフェなどをinstagramなどで調べては，スポット間の位置関係を確認するために，そのスポットをいちいちGoogleマップで検索しております．  
この「いちいちGoogleマップで検索する」という作業が手間に感じていたため，気になるスポットをすぐマップ上に一覧表示することができるアプリケーションがあれば，旅行計画の作成が大分楽になるのではないかと考えたのが制作背景です．

## 機能一覧

## 使用イメージ
**ゲストログイン**  
ログインしていない状態で，トップページの「使ってみる」ボタンを押すことでゲストログインできます．
![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F3621851%2F04748019-2e76-4eb9-00cf-3ada5bc2a521.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=dec9580b802ce096e41e6886b1bcce96)


**旅行の新規作成/名前変更/削除，日程の追加/削除**

scheduleSidebar.gif


**キーワードでのスポット検索**

keyword.gif


**エリアとカテゴリでのスポット検索**

area-category.gif


**メモの追加，スポットの削除**

memo-deleteSpot.gif


**Googleマップのビューポート自動調整**

viewport.gif


**Googleマップマーカーの色切り替わり**

marker.gif


**移動時間検索**

searchRoute.gif

## 使用技術
- HTML / CSS / JavaScript
- React 18
- TypeScript
- Next.js 14.2.3
- Material UI
- Tailwind CSS
- Google Maps API(Maps JavaScript API, Places API, Directions API)
- react-google-maps
- Firebase(Function, Firestore, Authentication)
- その他ツール
  - VSCode
  - Git / GitHub

## Firestoreのデータ構造
firestore構造_rev.png

tripsサブコレクションの各ドキュメントに対してわざわざdaysサブコレクションを設定している理由は，firestoreでは配列フィールドの中に配列を設定することはできないためです．

　　　このようにはできない　↓
firestore構造2_rev.png

ただ，このデータ構造だと読み込むドキュメントの数が多くなり，firebaseの課金額が増えやすくなってしまいます．  
より適切なデータ構造があるのかもしれませんが，未経験の自分が深く考えても最適案を出すのは難しいと判断し，とりあえず思いついたこのデータ構造で進めました．

## 苦労した点
- **TypeScriptエラー**  
シンプルな型を扱う分には問題ないのですが，useRefやイベントハンドラ，ライブラリ関数等の複雑な型のエラーで苦労しました．
- **非同期処理の扱い**  
Google Maps APIリクエストなどの非同期処理が終わってから描画をさせるように実装する点で苦労しました．  
Promise/async/awaitを使った非同期処理やuseEffectの性質について一から学び，対処しました．
- **Google Maps API関連の実装**  
Google Maps APIは公式ドキュメントが古いままのものが多く，公式ドキュメント通りにコードを書いてもうまく実装できないことが多々あり，苦労しました．  
vis.glの「react-google-map」という比較的新しくドキュメントが充実しているライブラリを使うことで，なんとか所望の実装をすることができました．  
また，途中でGoogle Cloudの請求先アカウントが突然停止され，APIキーが無効になってしまいました．コードを書いていたわけではないですが，ここが最もポートフォリオ作成で苦しんだ点です．  
アカウントを有効にするために様々なことを試みたのですが，結局有効にできず，最終的には家族にGoogle Cloudアカウントを作成してもらい，それを使ってポートフォリオを完成させました．

## 今後の課題
- **公共交通機関での移動経路・時間検索**  
このアプリでは，スポット間の移動経路・時間の検索にはGoogle Directions APIを使用しております．  
Directions APIでは，日本国内のみ，公共交通機関を使った移動経路の検索ができないことが後からわかりました．  
今後，他のAPIを使って，公共交通機関での移動経路・時間検索も実装できればと思います．  
- **スケジュールページのレスポンシブデザイン実装**
- **再レンダリングの最適化（動作が少し重い）**
- **コードが長いコンポーネントを分割して可読性を上げる**
- **検索結果を人気順に並び替え**
- **検索結果を増やしてページネーション実装（現在は最大20件までしか表示されない）**
- **確定版スケジュールの作成ページ実装**
→　スケジュールをGoogleカレンダーに反映機能する機能の実装
etc.

## 終わりに
以上，約４ヶ月かけて作成したポートフォリオについてまとめました．  
作成を進めていく中で，中々解決できないエラーなど多くの壁に直面し辛い時期もありましたが，諦めずに一つずつ壁を乗り越え，完成まで至ることができました．  
また，辛いと感じつつも，基本的にはwebアプリケーションを作っている時は楽しく，困難なエラーを解決できたときは大きな喜びを感じることができました．  
今後も様々な技術をキャッチアップして，より価値のあるアプリケーションを提供できるエンジニアになれるよう，努めてまいります！  
  
最後まで読んでいただきありがとうございました！

## 学習教材
progate HTML & CSSコース  
progate JavaScriptコース  
Udemy Git：はじめてのGitとGitHub  
https://www.udemy.com/course/intro_git/  
Udemy 【最新ver対応済】モダンJavaScriptの基礎から始める挫折しないためのReact入門  
https://www.udemy.com/course/modern_javascipt_react_beginner  
Udemy Reactに入門した人のためのもっとReactが楽しくなるステップアップコース完全版  
https://www.udemy.com/course/react_stepup  
Udemy 今後のフロントエンド開発で必須知識となるReact v18の機能を丁寧に理解する  
https://www.udemy.com/course/react_v18  
Udemy 【Next.js13】最新バージョンのNext.js13をマイクロブログ構築しながら基礎と本質を学ぶ講座  
https://www.udemy.com/course/nextjs13_learning_with_microblog  
