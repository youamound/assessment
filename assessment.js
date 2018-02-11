(function　(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    
    /**
     * 指定した要素の子供全てを削除する
     * @param {HTML Element} element HTMLの要素
     */
     function removeAllChildren(element){ //elemnt(要素)があるかぎり
         while (element.firstChild){// 先頭に子供の要素がある限り削除
            element.removeChild(element.firstChild);
         }
     }

    assessmentButton.onclick = () => { //以前は関数の変数を入れてたが、関数が短いならこのようにそのままいれてもおけ
        const userName = userNameInput.value;
        if (userName.length === 0){
            return;
        }
        
        //診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header); //resultDividedにheaderを’子要素’としていれてね。

        const paragraph = document.createElement('p');
        const result = assessment(userName); 
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //TODO ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            +'&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text',　result);
        anchor.setAttribute('data-lang', 'ja');
        anchor.setAttribute('data-show-count', 'false');
        anchor.innerText = ('#あなたのいいところをツイートする');
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };

    const answers = [
       '{ userName }のいいところは声です。{ userName }の特徴的な声はみなを惹きつけ、心に残ります。',
       '{ userName }のいいところはまなざしです。{ userName }に見つめられた人は、気になって仕方がないでしょう。',
       '{ userName }のいいところは情熱です。{ userName }の情熱に周りの人は感化されます。',
       '{ userName }のいいところは厳しさです。{ userName }の厳しさがものごとをいつも成功に導きます。',
       '{ userName }のいいところは知識です。博識な{ userName }を多くの人が頼りにしています。',
       '{ userName }のいいところはユニークさです。{ userName }だけのその特徴が皆を楽しくさせます。',
       '{ userName }のいいところは用心深さです。{ userName }の洞察に、多くの人が助けられます。',
       '{ userName }のいいところは見た目です。内側から溢れ出る{ userName }の良さに皆が気を惹かれます。',
       '{ userName }のいいところは決断力です。{ userName }がする決断にいつも助けられる人がいます。',
       '{ userName }のいいところは思いやりです。{ userName }に気をかけてもらった多くの人が感謝しています。',
       '{ userName }のいいところは感受性です。{ userName }が感じたことに皆が共感し、わかりあうことができます。',
       '{ userName }のいいところは節度です。強引すぎない{ userName }の考えに皆が感謝しています。',
       '{ userName }のいいところは好奇心です。新しいことに向かっていく{ userName }の心構えが多くの人に魅力的に映ります。',
       '{ userName }のいいところは気配りです。{ userName }の配慮が多くの人を救っています。',
       '{ userName }のいいところはその全てです。ありのままの{ userName }自身がいいところなのです。',
       '{ userName }のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{ userName }が皆から評価されています。',
       '{ userName }のいいところは優しさです。{ userName }の優しい雰囲気や立ち振舞に多くの人が癒やされています。'
    ];

    /**
    * これは名前を渡すと診断結果を返す関数です
　　 * @param(引数の意味) {string(文字列の意味)} userName 　ユーザーの名前　
    * @return {string} 診断結果
    */

    function assessment(userName)　{
        // 名前を数値に変換してそれを足し合わせる。するとその人オリジナルの値が出る。
        let sumOfcharCode　= 0;　//let ES6の機能。constと違い、上書きできる。{}の中だけに適用される点がvarと違う。
        for (let i = 0; i < userName.length; i++)　{
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を解答の数を割って添字の数値を求める
        const index = sumOfcharCode % answers.length;　//indexとは配列の添字の数という意
        let result = answers[index];
        result = result.replace(/\{ userName \}/g, userName); //{userName}と{ userName }でミスった

        //todo　診断処理{userName}をユーザーの名前に変える
        return result;
    }

    //テストコード
    console.assert(
        assessment('真人') === '真人のいいところは思いやりです。真人に気をかけてもらった多くの人が感謝しています。'
        ,'テスト失敗'
    );
    console.assert(
        assessment('真人') === assessment ('真人'),
        'テスト失敗'
    );

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13){
            assessmentButton.onclick();
        }
    };
})();


