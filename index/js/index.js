		/**
		*===================================ȫ��ҳ��/����===================================
		**/
		var pageOf={
					"bannerInterval":10000,
					"style-color":"#1ab394"
		}
		/**
		*���� end
		**/

		window.onload = function () {
				initClass.initBanner();
				initClass.initScrollPic();
				/**
				*ҳ��ͼƬ������
				*/
				toolsClass.imgLazy();
		}
		window.onscroll = function (){
				/**
				*logoͼƬ�仯
				*/
				toolsClass.logoOnscroll();
				
				/**
				*ҳ��ͼƬ������
				*/
				toolsClass.imgLazy();
		}
		
		/**
		*===================================ҳ�����===================================
		**/
		var pageParams={
			"bannerIndex":-1,     //��¼����banner�±�
			"bannerIntervalId":null, //bannerʱ���������
			"logoChangeIntervalTime":20, //logo���㺯�����仯���ʱ��
			"imgLazyOnscrollHeight":0 //�洢:������ͼƬ���ص���λ�ã�����ÿ�ζ��ӵ�һ��ͼƬ��ʼ����
		}
		
		/**
		*===================================��ʼ���� begin===================================
		**/
		var initClass={
			initBanner:function (){
			 	userClass.showBannerRight();
				pageParams.bannerIntervalId = setInterval("userClass.showBannerRight()",pageOf.bannerInterval);
			},
			initScrollPic:function(){
				toolsClass.appendTeamUser("teamUserUl");
				toolsClass.createScrollPic("scrollPic","LeftArr","RightArr");
			}
		}
		
		
		/**
		*===================================�û����� begin===================================
		**/
		var userClass={
				showBannerLeft(){
					pageParams.bannerIndex--;
					if(pageParams.bannerIndex<0){
						pageParams.bannerIndex=banners.length-1;
					}
					toolsClass.showBanner();
				},
				showBannerRight(){
					pageParams.bannerIndex++;
					if(pageParams.bannerIndex==banners.length){
						pageParams.bannerIndex=0;
					}
					toolsClass.showBanner();
				},
				openDatasEjectDiv(_index,thisObj){
					
					/**
					*	����td css��ԭ
					*/
					var tds = $("td[name='showDatasTd']");
					var extendsShow = false; //�Ƿ����ڲ鿴��
					$.each(tds,function(_index,_obj){
						
							if(_obj.style.color){
								extendsShow =true; //������ʽ����Ϊ�û��е������һ���鿴
							}
							
							if(_obj!=thisObj){
										_obj.style.color="";
							}
					});
					
					/**
					**�����ж�
					*/
					var isShow = "show";
					if(!thisObj.style.color){
						thisObj.style.color= pageOf["style-color"];
						isShow = "show";
					}else{
						thisObj.style.color="";
						isShow = "close";
					}
					
					
					if("close"==isShow){
						$("#showDatasEjectImgDiv").slideUp("slow");
					}
					
					if("show"==isShow){
						
						var waitTime = 1; 
						if(extendsShow){
							$("#showDatasEjectImgDiv").slideUp("slow");
							/**�в鿴������Ҫ�ر�ʱ�䣬û�в鿴��ֱ�Ӵ�**/
							waitTime = 700;
						}
						
						setTimeout(function(){
								$("#showDatasEjectImgDiv").html("");
								var showData = showDatas[_index];
								var showHeight = showData["h"];
								var imgNames = showData["imgs"].split(",");
								$.each(imgNames,function(index,value){
											var div = document.createElement("div");
											var img = document.createElement("img");
											img.src="index\\img\\datas\\"+value;
											div.append(img);
											$("#showDatasEjectImgDiv").append(div);
								});
								$("#showDatasEjectImgDiv").slideDown("slow").animate({height:showHeight});
							
							},waitTime);
					}
					
				},
				menuScrollMove(_id){
						$("html,body").animate({scrollTop: $("#"+_id).offset().top-80}, 1000);	
				}
		}
		/**
		*�û����� end
		**/
		
		
		/**
		*===================================������ begin===================================
		**/
		var toolsClass={
			showBanner:function(){
				var bannerObj = banners[pageParams.bannerIndex];
				var urlName =  bannerObj.urlName;
				$("#banner").css("backgroundImage","url('index/img/bg/"+urlName+"')");
				$("#bannerTitle").html(bannerObj.title);
				$("#bannerText").html(bannerObj.text);
			},
			appendTeamUser:function(appendDivId){
					$.each(users,function(index,obj){
						var html='<li>'+
												 '<div class="teamDiv">'+
															'<div class="teamBodyDiv">'+
																'<div><img class="teamimg" src="" imgLazy-src="index/img/team/'+obj.imgName+'" alt=""/></div>'+
																'<div class="teamUserName">'+obj.userName+'</div>'+
																'<div><a href="https://github.com/'+obj.githubId+'"><img class="githubimg" src="index/img/logo/github.png" imgLazy-src="index/img/logo/github.png"></img></a></div>'+
																'<div class="teamUserDesc">'+obj.userDesc+'</div>'+
															'</div>'+
															'</div>'+
						            '</li>';
						$("#"+appendDivId).append(html);	
					})
				},
				createScrollPic:function(scrollContId,arrLeftId,arrRightId){
				    var scrollPic = new ScrollPic();
				    scrollPic.scrollContId   = scrollContId; //��������ID
				    scrollPic.arrLeftId      = arrLeftId;//���ͷID
				    scrollPic.arrRightId     = arrRightId; //�Ҽ�ͷID

				    scrollPic.frameWidth     = 800;//��ʾ����
				    //scrollPic.frameWidth     = document.body.clientWidth;
				    scrollPic.pageWidth      = 250; //��ҳ���

				    scrollPic.speed          = 10; //�ƶ��ٶ�(��λ���룬ԽСԽ��)
				    scrollPic.space          = 10; //ÿ���ƶ�����(��λpx��Խ��Խ��)
				    scrollPic.autoPlay       = false; //�Զ�����
				    scrollPic.autoPlayTime   = 300; //�Զ����ż��ʱ��(��)

				    scrollPic.initialize(); //��ʼ��
				}
				,logoOnscroll:function(){
					var stop = document.documentElement.scrollTop || document.body.scrollTop;		
					
					if( stop >= 30 && $("#headDown").is(':hidden')){
							$("#headDef").hide();
							$("#headDown").fadeIn("slow");
							setTimeout("toolsClass.logoChangeMin()",pageParams.logoChangeIntervalTime);
					}else if(stop < 30 && $("#headDef").is(':hidden')){	
							$("#headDef").show();
							$("#headDown").fadeOut("slow");
							setTimeout("toolsClass.logoChangeMax()",pageParams.logoChangeIntervalTime);
					}
				},
				logoChangeMin(){
					var width = $("#logoImg").width();
					if(width>55){
						$("#logoImg").width(width-5);
						setTimeout("toolsClass.logoChangeMin()",pageParams.logoChangeIntervalTime);
					}
				},
				logoChangeMax(){
					var width = $("#logoImg").width();
					if(width<=90){
						$("#logoImg").width(width+5);
						setTimeout("toolsClass.logoChangeMax()",pageParams.logoChangeIntervalTime);
					}
				},
				imgLazy(){
					
		
	        var aImg = document.querySelectorAll('img');
	        var len = aImg.length;
					/**ͼƬ������*/	
					  var seeHeight = document.documentElement.clientHeight;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            for (var i = pageParams.imgLazyOnscrollHeight; i < len; i++) {
                if (aImg[i].offsetTop < seeHeight + scrollTop) {
                    if (aImg[i].getAttribute('src') == '') {
                        aImg[i].src = aImg[i].getAttribute('imgLazy-src');
                    }
                    pageParams.imgLazyOnscrollHeight = i + 1;
                   // console.log('n = ' + pageParams.imgLazyOnscrollHeight);
                }
            }
				}
				
		}
		/**
		*������ end
		**/
		
			
			
		
		
		