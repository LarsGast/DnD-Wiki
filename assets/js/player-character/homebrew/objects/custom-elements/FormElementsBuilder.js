import { getEmptyOption, getSelectOption } from '../../../util.js'

/**
 * Creates and returns a labeled input section for the form.
 * @param {string} labelText Text for the label of the input.
 * @param {string} id ID and name for the input element.
 * @param {string} defaultValue Default value for the input.
 * @param {boolean} isNumberInput Whether the input should be a number input.
 * @param {string} tooltip Optional tooltip text for the input. If provided, a tooltip icon will be added to the label.
 * @param {boolean} isRequired Whether the input is required.
 * @returns {HTMLElement} Section containing the label and input element.
 */
export const getInputSection = function(labelText, id, defaultValue, isNumberInput, tooltip, isRequired) {

    // Label.
    const label = getLabel(labelText, id, isRequired);

    // Input.
    const input = getInput(id, defaultValue, isNumberInput, isRequired);
    label.appendChild(input);

    // Tooltip.
    if (tooltip) {
        label.appendChild(getTooltipSpan(tooltip));
    }
    
    return getSection(label);
}

/**
 * Creates and returns a labeled textarea section for the form.
 * @param {string} labelText Text for the label of the textarea.
 * @param {string} id ID and name for the textarea element.
 * @param {string} defaultValue Default value for the textarea.
 * @param {string} tooltip Optional tooltip text for the textarea. If provided, a tooltip icon will be added to the label.
 * @param {boolean} isRequired Whether the input is required.
 * @returns {HTMLElement} Section containing the label and textarea element.
 */
export const getTextareaSection = function(labelText, id, defaultValue, tooltip, isRequired) {
    
    // Label.
    const label = getLabel(labelText, id, isRequired);

    // Textarea.
    const textArea = getTextarea(id, defaultValue, isRequired);
    label.appendChild(textArea);

    // Tooltip.
    if (tooltip) {
        label.appendChild(getTooltipSpan(tooltip));
    }

    return getSection(label);
}

/**
 * Creates and returns a labeled select section for the form.
 * @param {string} labelText Text for the label of the select element.
 * @param {string} id ID and name for the select element.
 * @param {string} defaultValue Default value for the select element.
 * @param {string[]} options Array of options for the select element. No support for objects, only strings.
 * @param {string} tooltip Optional tooltip text for the select element. If provided, a tooltip icon will be added to the label.
 * @param {boolean} isRequired Whether the input is required.
 * @returns {HTMLElement} Section containing the label and select element.
 */
export const getSelectSection = function(labelText, id, defaultValue, options, tooltip, isRequired) {

    // Label.
    const label = getLabel(labelText, id, isRequired);

    // Select.
    const select = document.createElement('select');
    select.id = `homebrew-object-${id}`;
    select.name = id;
    select.required = isRequired;

    select.appendChild(getEmptyOption("-- Select an option --", ""));

    for (const option of options) {
        select.appendChild(getSelectOption(option));
    }

    select.value = defaultValue ?? "";

    label.appendChild(select);

    // Tooltip.
    if (tooltip) {
        label.appendChild(getTooltipSpan(tooltip));
    }

    return getSection(label);
}

/**
 * Creates a label element with the given text and ID.
 * @param {string} labelText Text for the label.
 * @param {string} id ID for the label and associated input element.
 * @param {boolean} isRequired Whether the input is required.
 * @returns {HTMLLabelElement} Label element.
 */
const getLabel = function(labelText, id, isRequired) {
    const label = document.createElement('label');
    label.textContent = labelText + (isRequired ? ' *' : '');
    label.htmlFor = `homebrew-object-${id}`;

    return label;
}

/**
 * Creates a tooltip span element with the given tooltip text.
 * @param {string} tooltip Tooltip text to be displayed in the tooltip.
 * @returns {HTMLSpanElement} Tooltip span element.
 */
export const getTooltipSpan = function(tooltip) {
    const tooltipSpan = document.createElement('span');
    tooltipSpan.className = 'icon question';
    tooltipSpan.title = tooltip;

    return tooltipSpan;
}

/**
 * Creates a section element containing the given label.
 * @param {HTMLLabelElement} label Label element to be included in the section.
 * @returns {HTMLElement} Section element containing the label.
 */
const getSection = function(label) {

    const section = document.createElement('section');
    section.appendChild(label);

    return section;
}

/**
 * Creates and returns a input element for the form.
 * @param {string} id ID and name for the input element.
 * @param {string} defaultValue Default value for the input.
 * @param {boolean} isNumberInput Whether the input should be a number input.
 * @param {boolean} isRequired Whether the input is required.
 * @returns {HTMLInputElement} Input element.
 */
const getInput = function(id, defaultValue, isNumberInput, isRequired) {
    const input = document.createElement('input');

    input.id = `homebrew-object-${id}`;
    input.name = id;
    input.value = defaultValue ?? '';
    input.type = isNumberInput ? 'number' : null;
    input.required = isRequired;

    return input;
}
/**
 * Creates and returns a textarea element for the form.
 * @param {string} id ID and name for the textarea element.
 * @param {string} defaultValue Default value for the textarea.
 * @param {boolean} isRequired Whether the textarea is required.
 * @returns {HTMLTextAreaElement} textarea element.
 */
const getTextarea = function(id, defaultValue, isRequired) {
    const textArea = document.createElement('textarea');

    textArea.id = `homebrew-object-${id}`;
    textArea.name = id;
    textArea.value = defaultValue ?? '';
    textArea.required = isRequired;

    return textArea;
}