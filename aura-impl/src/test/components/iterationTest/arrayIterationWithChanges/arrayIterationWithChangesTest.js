/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({

//AB : add before, AI : add inside, AA : add after
//my mini test plan:
//add to empty list
//mix three orders
//also check the position of button should behind the list 
//-- this doesn't happen once we put list into a <div>, but still something we should look into
	
	getNewListTextAfterAddBefore : function(oldText,numberOfClick) {
		var newText = oldText;
		for(var i = 0;i < numberOfClick; i++) {
			newText = "ultra-violet 1 ultra-violet 2"+(newText==""?"":" ")+newText;
		}
		return newText;
	},
	
	getNewListTextAfterAddInside : function(oldText1, oldText2,numberOfClick) {
		var textAdded = "g-y 1 g-y 2 ";
		var newTextInside = textAdded;
		for(var i = 0;i < numberOfClick-1; i++) {
			newTextInside = newTextInside+textAdded;
		}
		return oldText1+" "+newTextInside+oldText2;
	},
	
	getNewListTextAfterAddAfter: function(oldText,numberOfClick) {
		var newText = oldText;
		for(var i = 0;i < numberOfClick; i++) {
			newText = newText+(newText==""?"":" ")+"infra-red 1 infra-red 2";
		}
		return newText;
	},
	
	sanityCheck : function(cmp) {
		//TODO: check the initial list text before any test
	},
	
	/**
     *  test click on add before
     */
    testABWithDefaultList: {
        test: function(cmp) {
        	$A.test.clickOrTouch(cmp.find("buttonAddBefore").getElement());
        	var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddBefore("purple blue green yellow orange red",1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to front of default list not showing up in DOM.");
        }
    },
    
    testABWithEmptyList: {
    	attributes: {
    		colors : ""
    	},
    	test: function(cmp) {
        	$A.test.clickOrTouch(cmp.find("buttonAddBefore").getElement());
        	var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddBefore("",1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to front of empty list not showing up in DOM.");
        }
    },
    
    /**
     *  test click on add inside
     */
    testAIWithDefaultList: {
    	test: function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddInside").getElement());
        	var ele_iterationDiv = document.getElementsByClassName("iterationDiv")
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddInside("purple blue green","yellow orange red",1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to middle of default list not showing up in DOM.");
    	}
    },
    
    
    /**
     *  test click on add after
     */
    testAAWithDefaultList: {
    	test: function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddAfter").getElement());
        	var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddAfter("purple blue green yellow orange red",1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to end of default list not showing up in DOM.");
    	}
    },
    
    testAAWithEmptyList: {
    	attributes: {
    		colors : ""
    	},
    	test: function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddAfter").getElement());
        	var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddAfter("",1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to end of default list not showing up in DOM.");
    	}
    },
    
    /**
     * Time to mix and match
     */
    shareTextBetweenTests:"", 
    testMixAndMatch : {
    	test: [function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddAfter").getElement());
        	var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddAfter("purple blue green yellow orange red",1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to end of list #1 not showing up in DOM.");
            this.shareTextBetweenTests = newText;
    	}, function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddAfter").getElement());
        	var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddAfter(this.shareTextBetweenTests,1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to end of list #2 not showing up in DOM.");
            this.shareTextBetweenTests = newText;
    	},function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddBefore").getElement());
    		var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddBefore(this.shareTextBetweenTests,1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to beginning of list #1 not showing up in DOM.");
            this.shareTextBetweenTests = newText;
    	},function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddInside").getElement());
    		var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
    		var oldText = this.shareTextBetweenTests;
    		//"ultra-violet 1 ultra-violet 2 purple blue green", no space after green
    		var oldText1 = oldText.substr(0, oldText.indexOf('yellow')-1);
    		//"yellow orange red infra-red 1 infra-red 2 infra-red 1 infra-red 2", no space before yellow
    		var oldText2 = oldText.substr(oldText.indexOf('yellow'), oldText.length);
    		var newText = this.getNewListTextAfterAddInside(oldText1,oldText2,1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to middle of list #1 not showing up in DOM.");
            //shareTextBetweenTests = ultra-violet 1 ultra-violet 2 ultra-violet 1 ultra-violet 2 purple blue green g-y 2 g-y 1 yellow orange red infra-red 1 infra-red 2 
            this.shareTextBetweenTests = newText;
    	},function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddInside").getElement());
    		var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
      		var oldText = this.shareTextBetweenTests;
      		//"ultra-violet 1 ultra-violet 2 ultra-violet 1 ultra-violet 2 purple blue green g-y 2 g-y 1"
    		var oldText1 = oldText.substr(0, oldText.indexOf('yellow')-1);
    		//"yellow orange red infra-red 1 infra-red 2"
    		var oldText2 = oldText.substr(oldText.indexOf('yellow'), oldText.length);
    		var newText = this.getNewListTextAfterAddInside(oldText1,oldText2,1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to middle of list #2 not showing up in DOM.");
            //shareTextBetweenTests = ultra-violet 1 ultra-violet 2 ultra-violet 1 ultra-violet 2 purple blue green g-y 2 g-y 1 g-y 2 g-y 1 yellow orange red infra-red 1 infra-red 2 
            this.shareTextBetweenTests = newText;
    	},function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddAfter").getElement());
    		var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddAfter(this.shareTextBetweenTests,1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to end of list #3 not showing up in DOM.");
            this.shareTextBetweenTests = newText;
    	},function(cmp) {
    		$A.test.clickOrTouch(cmp.find("buttonAddBefore").getElement());
    		var ele_iterationDiv = document.getElementsByClassName("iterationDiv");
            var iterationDivText = $A.util.getText(ele_iterationDiv[0]);
        	var newText = this.getNewListTextAfterAddBefore(this.shareTextBetweenTests,1);
            $A.test.assertEqualsIgnoreWhitespace(newText, iterationDivText,
            "list with new items added to beginning of list #2 not showing up in DOM.");
            this.shareTextBetweenTests = newText;
    	}]
    }
})