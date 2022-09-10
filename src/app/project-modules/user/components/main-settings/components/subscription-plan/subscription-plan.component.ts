import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss']
})
export class SubscriptionPlanComponent implements OnInit {
  planActivation:any;
  subscriptionPlans:any[]=[
    {
      logo:"/assets/images/space-ship.png",
      plan:"Anchor Plan",
      price:'22,000',
      description1:"最大在庫確認数",
      description2:"1日の在庫確認回数",
      description3:"一回の商品データ抽出数",
      description4:"1ヶ月の商品データ抽出回数",
      label1:"1000 件",
      label2:"4 回",
      label3:"10 〜 500 商品",
      label4:"600 回",
      planChange:"Check your Current Plan",
      planActivation:"active",
      status:'normal'
    },
    {
      logo:"/assets/images/add-on.png",
      plan:"Add on Plan",
      price:'+ 5000',
      description2:"minimum inventory check",
      description3:"scrapping",
      label2:"1000 products",
      label3:"200 times",
      planChange:"Add on",
      planActivation:"inActive",
      status:'addon'
    },
    {
      logo:"/assets/images/rocket.png",
      plan:"Premium Plan",
      price:'11,000',
      description1:"最大在庫確認数",
      description2:"1日の在庫確認回数",
      description3:"一回の商品データ抽出数",
      description4:"1ヶ月の商品データ抽出回数",
      label1:"1000 件",
      label2:"3 回",
      label3:"10 〜 800 商品",
      label4:"500 回",
      planChange:"Change to Premium",
      planActivation:"inActive",
      status:'normal'
    },
    {
      logo:"/assets/images/baloon.png",
      plan:"Basic Plan",
      price:'5,500',
      description1:"最大在庫確認数",
      description2:"1日の在庫確認回数",
      description3:"一回の商品データ抽出数",
      description4:"1ヶ月の商品データ抽出回数",
      label1:"1000 件",
      label2:"2 回",
      label3:"10 〜 50 商品",
      label4:"200 回",
      planChange:"Change to Basic",
      planActivation:"inActive",
      status:'normal'
    },


  ]
  constructor() { }

  ngOnInit(): void {
  }

}
