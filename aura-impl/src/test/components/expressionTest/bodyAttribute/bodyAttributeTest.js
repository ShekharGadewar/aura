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
    clickGivenButtonToSetBody : function(cmp, buttonId, addedIds, deletedIds, failureMsg){
        $A.test.clickOrTouch(cmp.find(buttonId).getElement());
        for (var i in addedIds) {
            $A.test.assertDefined(cmp.find(addedIds[i]), failureMsg + ": unable to access new component by aura:id");
        }
        for (var i in deletedIds) {
            $A.test.assertUndefined(cmp.find(deletedIds[i]), failureMsg + ": still able to access old component by aura:id");
        }
    },
    verifyDOMContent:function(cmp, componentId, addedText, deletedText, failureMsg){
        var actual = $A.test.getTextByComponent(cmp.find(componentId));
        for (var i in addedText) {
            $A.test.assertTrue(actual.indexOf(addedText[i]) >= 0, failureMsg + ": unable to find new text");
        }
        for (var i in deletedText) {
            $A.test.assertFalse(actual.indexOf(deletedText[i]) >= 0, failureMsg + ": still able find old text");
        }
    },
    /**
     * Verify that setting the simple component's body to an empty array will clean the
     * body markup and auto destroy the components.
     * The test also verifies that the destroy is recursive.
     */
    testClearSimpleCmpBody: {
        test:[function(cmp){
            this.verifyDOMContent(cmp, "simpleCmp", ["Facet of Simple Cmp", "Clear Body of Simple Cmp"], [],
                "Failed verify initial state");
            this.clickGivenButtonToSetBody(cmp, "clearSimpleCmpBody", [], ["simpleCmpText", "clearBodyFromSimpleCmp"],
                "Failed to clear body of simple component");
            this.verifyDOMContent(cmp, "simpleCmp", [], ["Facet of Simple Cmp", "Clear Body of Simple Cmp"],
                "Failed to clean DOM elements of simple component");
        }]
    },

    /**
     * Verify that setting the simple component's body will clean the
     * body markup and auto destroy the components in v.body
     */
    testSettingSimpleCmpBody: {
        test:[function(cmp){
            this.verifyDOMContent(cmp, "simpleCmp", ["Facet of Simple Cmp", "Clear Body of Simple Cmp"], [],
                "Failed verify initial state");
            this.clickGivenButtonToSetBody(cmp, "setSimpleCmpBody", ["newButton"], ["simpleCmpText", "clearBodyFromSimpleCmp"],
                "Failed to replace the components in body of Simple Cmp");
            this.verifyDOMContent(cmp, "simpleCmp", ["New Button"], ["Facet of Simple Cmp", "Clear Body of Simple Cmp"],
                "Failed to replace the DOM elements of simple component");
        }]
    },

    /**
     * Verify that adding and deleting to the simple component's body will clean the
     * body markup and auto destroy the components in v.body
     */
    testAddingSimpleCmpBody: {
        test:[function(cmp){
            this.verifyDOMContent(cmp, "simpleCmp", ["Facet of Simple Cmp", "Clear Body of Simple Cmp"], [],
                "Failed verify initial state");
            this.clickGivenButtonToSetBody(cmp, "addSimpleCmpBody", ["simpleCmpText", "addButton"], ["clearBodyFromSimpleCmp"],
                "Failed to add and destroy components in body of simple component");
            this.verifyDOMContent(cmp, "simpleCmp", ["Facet of Simple Cmp", "Added Button"], ["Clear Body of Simple Cmp"],
                "Failed to add and destry DOM elements of simple component");
        }]
    },

    /**
     * Verify that setting the custom component's body to an empty array will clean the
     * body markup and auto destroy the components.
     * The test also verifies that the destroy is recursive.
     */
    testClearCustomCmpBody: {
        test:[function(cmp){
            this.verifyDOMContent(cmp, "customCmp", ["Facet of Custom Cmp", "Clear Body of Custom Cmp"], [],
                "Failed verify initial state");
            this.clickGivenButtonToSetBody(cmp, "clearCustomCmpBody", [], ["customCmpText", "clearBodyFromCustomCmp"],
                "Failed to clear body of custom component");
            this.verifyDOMContent(cmp, "customCmp", [], ["Facet of Custom Cmp", "Clear Body of Custom Cmp"],
                "Failed to clean DOM elements of custom component");
        }]
    },

    /**
     * Verify that setting the custom component's body will clean the
     * body markup and auto destroy the components in v.body
     */
    testSettingCustomCmpBody: {
        test:[function(cmp){
            this.verifyDOMContent(cmp, "customCmp", ["Facet of Custom Cmp", "Clear Body of Custom Cmp"], [],
                "Failed verify initial state");
            this.clickGivenButtonToSetBody(cmp, "setCustomCmpBody", ["newButton"], ["customCmpText", "clearBodyFromCustomCmp"],
                "Failed to replace the components in body of custom component");
            this.verifyDOMContent(cmp, "customCmp", ["New Button"], ["Facet of Custom Cmp", "Clear Body of Custom Cmp"],
                "Failed to replace the DOM elements of custom component");
        }]
    },

    /**
     * Verify that adding and deleting to the custom component's body will clean the
     * body markup and auto destroy the components in v.body
     */
    testAddingCustomCmpBody: {
        test:[function(cmp){
            this.verifyDOMContent(cmp, "customCmp", ["Facet of Custom Cmp", "Clear Body of Custom Cmp"], [],
                "Failed verify initial state");
            this.clickGivenButtonToSetBody(cmp, "addCustomCmpBody", ["customCmpText", "addButton"], ["clearBodyFromCustomCmp"],
                "Failed to add and destroy components in body of custom component");
            this.verifyDOMContent(cmp, "customCmp", ["Facet of Custom Cmp", "Added Button"], ["Clear Body of Custom Cmp"],
                "Failed to add and destry DOM elements of custom component");
        }]
    }

})