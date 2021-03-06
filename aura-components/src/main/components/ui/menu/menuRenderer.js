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
    afterRender: function(component, helper) {
    	var target = helper.getTargetComponent(component);
    	var trigger = helper.getTriggerComponent(component);
    	if (target && trigger) {
            target.set("v.referenceElement", trigger.getElement());
    	}

        // This is to support components that have set these attributes on ui:menu. Should remove this code once they are modified.
        if (target) {
            target.set("v.closeOnClickOutside", component.get("v.closeOnClickOutside"));
        }
        if (trigger) {
            trigger.set("v.stopClickPropagation", component.get("v.stopClickPropagation"));
        }

    	return this.superAfterRender();
	}
})