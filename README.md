# ドローン運行アシスト
- [無人航空機の飛行日誌の取扱要領](https://www.mlit.go.jp/koku/content/001574394.pdf)
- [リモート ID 機器等及びアプリケーションが備えるべき要件](https://www.mlit.go.jp/koku/content/001444589.pdf)

## 無人航空機の飛行記録 JOURNEY LOG OF UAS
- 無人航空機の登録記号 REGISTRATION ID OF UAS
- 飛行記録 JOURNEY LOG
  - 飛行年月日 FLIGHT DATE
  - 飛行させた者の氏名 NAME OF PILOT
  - 飛行概要 NATURE OF FLIGHT
  - 離陸場所 FROM
  - 着陸場所 TO
  - 離陸時刻 OFF TIME
  - 着陸時刻 ON TIME
  - 飛行時間 FLIGHT TIME
  - 総飛行時間 TOTAL FLIGHT TIME
  - 飛行の安全に影響のあった事項 MATTERS AFFECTED FLIGHT SAFETY
- 記事 REPORT
  - 発生年月日 SQUAWK DATE
  - 不具合事項 FLIGHT SQUAWK
  - 処置年月日 ACTION DATE
  - 処置その他 CORRECTIVE ACTION
  - 確認者 CONFIRMER

## 無人航空機の日常点検記録 DAILY INSPECTION RECORD OF UAS
- 機体全般 UAS GENERAL
- プロペラ PROPELLER(S)
- フレーム FLAME
- 通信系統 COMMUNICATION SYSTEM
- 推進系統 PROPULSION SYSTEM
- 電源系統 POWER SYSTEM
- 自動制御系統 AUTOMATIC CONTROL SYSTEM
- 操縦装置 FLIGHT CONTROL SYSTEM
- バッテリー、燃料 BATTERY, FUEL 

- 特記事項 NOTES
- 実施場所 PLACE 
- 実施年月日 DATE
- 実施者 INSPECTOR

## 無人航空機の点検整備記録 INSPECTION AND MAINTENANCE RECORD OF UAS

- 実施年月日 DATE
- 総飛行時間 TOTAL FLIGHT TIME
- 点検、修理、改造及び整備の内容 DETAIL
- 実施理由 REASON
- 実施場所 PLACE
- 実施者 ENGINEER
- 備考 REMARKS

# 印刷関係
## [JSpdf](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html)
## [ついに、Webアプリでの帳票印刷のベストプラクティスを編み出しました](https://zenn.dev/ttskch/articles/1f1572cfd2e375)
- svgで生成しておき、svgの中の文字列を入れ替えてから印刷させる
## [JavaScriptでPDF出力を実装する方法](https://www.migaro.co.jp/tips/2386/)
- pdfに対して一座標指定で文字を設定する。
## [jsPDFで日本語対応したPDFを作成する方法（テーブルもあり）](https://qiita.com/niyu1103/items/ed4941ddc7689df771dd)
## [jsPDF・html2canvasで動的なデータのPDF出力機能を作った話](https://zenn.dev/kamegoro/articles/62fb89f36355fa)
## [Laravel + React ブラウザだけでPDF をつくる](https://blog.capilano-fw.com/?p=11213)

# アプリケーションリリースプラン
## Ver 0.1.0
- データはlocal.strageに保存
- 飛行記録を容易に記録できる。
- フライト画面
  - 1ボタン
    - 状態に応じて飛行開始/飛行終了ボタン
  - 飛行中の経過時間が表示される。
- 保存記録のexportが可能

## Ver 0.1.1
- 保存記録のimportが可能
- 設定画面
  - グループIdは決め打ちハードコード。1つしか持てない。
  - 機体Idは初期値ハードコード、変更可能。1つしか持てない。
  - ユーザーIdは初期値ハードコード、変更可能。1つしか持てない。

## Ver 0.1.2
- 記録の参照が可能。
- ユーザーフライト一覧表示

## Ver 0.1.3
- 記録の変更が可能。
- ユーザーフライト一覧でダブルクリックすることで変更可能。

## Ver 0.1.4
- 記録の印刷が可能。
- 国交省のpdfをテンプレートにpdf出力させる。

## Ver 0.2.0
- 点検記録も残せる。
- フライト画面(日常点検)
  - 日常点検記録入力画面完了後、フライト開始/終了画面に遷移。
  - 飛行開始待ち状態のとき、フライト終了ボタン押下可能。
  - 日常点検記録入力画面(フライト後)に遷移。
- 定期点検画面

## Ver 0.3.0
複数ユーザー対応
複数機体対応
複数グループ対応

## Ver 1.0.0
データベースに永続的にデータを保存

# データ構造
```
{
  'groupes':[
    {
      'groupId':number,
      'name':string,
      'uas'[uaId],
      'users':[userId],
      'registAt':actionId,
      'deleteAt':actionId,
    }
  ],
  'uas':[
    {
      'uaId':number,
      'registratedId':string,
      'name':string,
      'totalFlightTime':number,
      'lastFlightUpdate':actionId,
      'lastMentenaceAt':actionid,
      'registAt':actionId,
      'deleteAt':actionId,
    }
  ],
  'users':[
    {
      'userId':number, // 1000以降を一般ユーザーとして使う
      'name':string,
      'places':[
        {
          'name':string,
          'loc':{'lon','lat'}
        }
      ],
      'registAt':actionId,
      'deleteAt':actionId
    }
  ]
  'actions':[
    {
      'actionId':number,
      'userId':number,
      'type':[
        {add,modiry,del}x{group,user,ua,record}
      ]
      'action':{}
    }
  ],
  'records':[
    {
      'recordId':number,
      'uaId'number,
      'userId':number,
      'type':[
        'journey',
        'report',
        'inspection',
        'mentenance',
      ],
      'record':{},
      'history':[
        actionId
      ]
    }
  ]
}
```
# GUI構造
- __root
  - 新規登録
  - 履歴参照
  - 設定
- index
  - 各リンクの説明
- createRecords
  - New inspection
  - New journey
  - New Mentenance
  - Import from file
- View
  - journy
  - report
  - inspection
  - mentenance
- Settings
  - Group
  - UA
  - ユーザー 
