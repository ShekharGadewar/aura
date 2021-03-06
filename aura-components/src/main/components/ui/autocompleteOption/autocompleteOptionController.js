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
    handleClick: function(component, event, helper) {
        if ($A.util.supportsTouchEvents()) {
            var element = event.target || event.srcElement;
            var event; // The custom event that will be created 

            if (document.createEvent) {
                event = document.createEvent("HTMLEvents");
                event.initEvent("customclick", true, true);
            } else {
                event = document.createEventObject();
                event.eventType = "customclick";
            }

            event.eventName = "customclick";

            if (document.createEvent) {
                element.dispatchEvent(event);
            } else {
                element.fireEvent("on" + event.eventType, event);
            }
        } 
    },
    
    handleMouseover: function(component, event, helper) {
        var concreteCmp = component.getConcreteComponent();
        var _helper = concreteCmp.getDef().getHelper();
        _helper.handleMouseover(concreteCmp);
    },
    
    handleMouseout: function(component, event, helper) {
        var concreteCmp = component.getConcreteComponent();
        var _helper = concreteCmp.getDef().getHelper();
        _helper.handleMouseout(concreteCmp);
    }   
})
