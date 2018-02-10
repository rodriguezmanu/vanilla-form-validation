// Module Pattern
const ValidationModule = (function() {
    const validators = {
        name: /^[a-zA-Z]+$/,
        phone: /^\({1}\d{3}\){1}\d{3}[-]{1}\d{4}$/,
        email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/
    };

    const classes = {
        border: {
            danger: 'border-danger',
            sucess: 'border-success'
        },
        alert: {
            danger: 'alert-danger',
            sucess: 'alert-success'
        }
    };

    const elements = [
        {
            id: 'firstName',
            selector: document.querySelector('input[name="firstName"]'),
            pattern: validators.name
        },
        {
            id: 'lastName',
            selector: document.querySelector('input[name="lastName"]'),
            pattern: validators.name
        },
        {
            id: 'phone',
            selector: document.querySelector('input[name="phone"]'),
            pattern: validators.phone
        },
        {
            id: 'email',
            selector: document.querySelector('input[name="email"]'),
            pattern: validators.email
        }
    ];

    const actions = {
        submit: document.querySelector('button[type="submit"]'),
        form: document.querySelector('form'),
        alert: document.querySelector('.alert')
    };

    const messages = {
        sucess: 'Success your information has been sent!',
        error: "Error there's something wrong with your information."
    };

    const init = () => {
        // Submit listener
        _submitListener();

        // Reset Listener
        _resetListener();
    };

    /**
     * Submit action Listener
     */
    const _submitListener = () => {
        actions.form.addEventListener('submit', (event) => {
            event.preventDefault();

            let isValidForm = true;

            _cleanClasses();

            for (let index = 0; index < elements.length; index++) {
                const el = elements[index];

                if (!_validate(el)) {
                    el.selector.classList.add(classes.border.danger);
                    isValidForm = false;
                } else {
                    el.selector.classList.add(classes.border.sucess);
                }

                _validationHandler(isValidForm, actions.alert);
            }
        });
    };

    /**
     * Reset action Listener
     */
    const _resetListener = () => {
        actions.form.addEventListener('reset', (event) => {
            _cleanClasses(true);

            actions.alert.innerHTML = '';
            actions.alert.classList.remove(
                classes.alert.sucess,
                classes.alert.danger
            );
        });
    };

    /**
     * Validate element regex
     *
     * @param {Object} element
     */
    const _validate = (element) => {
        const regex = RegExp(element.pattern);

        return regex.test(element.selector.value);
    };

    /**
     * Clean all errors classes
     *
     * @param {Boolean} [isSuccess=false]
     */
    const _cleanClasses = (isSuccess = false) => {
        for (let index = 0; index < elements.length; index++) {
            const el = elements[index];

            el.selector.classList.remove(classes.border.danger);

            if (isSuccess) {
                el.selector.classList.remove(classes.border.sucess);
            }
        }
    };

    /**
     * Validation helper, set class and message with danger or
     *  success depending on validation
     *
     * @param {Boolean} isValidForm
     * @param {Object} element
     */
    const _validationHandler = (isValidForm, element) => {
        if (isValidForm) {
            element.innerHTML = messages.sucess;

            element.classList.add(classes.alert.sucess);
            element.classList.remove(classes.alert.danger);
        } else {
            element.innerHTML = messages.error;

            element.classList.add(classes.alert.danger);
            element.classList.remove(classes.alert.sucess);
        }
    };

    return {
        init: init
    };
})();

ValidationModule.init();
