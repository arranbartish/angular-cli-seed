import { expect } from 'chai';
import { ToastyService, ToastOptions, ToastData, ToastyConfig } from 'ng2-toasty';
import { Toaster } from './Toaster';

describe('Toaster', () => {
    let mockedToastyService: ToastyService;
    let sut: Toaster;
    let passedOptions: ToastOptions | string | number;

    beforeEach(() => {
        mockedToastyService = new ToastyService(new ToastyConfig());
        sinon.stub(mockedToastyService, 'default')
            .callsFake((options: ToastOptions | string | number) => { passedOptions = options; });
        sinon.stub(mockedToastyService, 'info')
            .callsFake((options: ToastOptions | string | number) => { passedOptions = options; });
        sinon.stub(mockedToastyService, 'success')
            .callsFake((options: ToastOptions | string | number) => { passedOptions = options; });
        sinon.stub(mockedToastyService, 'wait')
            .callsFake((options: ToastOptions | string | number) => { passedOptions = options; });
        sinon.stub(mockedToastyService, 'warning')
            .callsFake((options: ToastOptions | string | number) => { passedOptions = options; });
        sinon.stub(mockedToastyService, 'error')
            .callsFake((options: ToastOptions | string | number) => { passedOptions = options; });
        sut = new Toaster(mockedToastyService);
    });

    describe('When calling the "default" method', () => {
        it('will be provided with a message and a title', () => {
            sut.default('the-message', 'the-title');

            expect((mockedToastyService.default as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('the-title');
        });

        it('will be provided with a message but no title', () => {
            sut.default('the-message');

            expect((mockedToastyService.default as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('');
        });

        it('will be provided with a null message, and no title', () => {
            sut.default(null);

            expect((mockedToastyService.default as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('');
            expect((passedOptions as ToastOptions).title).to.equal('');
        });
    });

    describe('When calling the "info" method', () => {
        it('will be provided with a message and a title', () => {
            sut.info('the-message', 'the-title');

            expect((mockedToastyService.info as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('the-title');
        });

        it('will be provided with a message but no title, defaulting it to "Info"', () => {
            sut.info('the-message');

            expect((mockedToastyService.info as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('Info');
        });
    });

    describe('When calling the "success" method', () => {
        it('will be provided with a message and a title', () => {
            sut.success('the-message', 'the-title');

            expect((mockedToastyService.success as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('the-title');
        });

        it('will be provided with a message but no title, defaulting it to "Success"', () => {
            sut.success('the-message');

            expect((mockedToastyService.success as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('Success');
        });
    });

    describe('When calling the "wait" method', () => {
        it('will be provided with a message and a title', () => {
            sut.wait('the-message', 'the-title');

            expect((mockedToastyService.wait as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('the-title');
        });

        it('will be provided with a message but no title, defaulting it to "Please wait..."', () => {
            sut.wait('the-message');

            expect((mockedToastyService.wait as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('Please wait...');
        });
    });

    describe('When calling the "warning" method', () => {
        it('will be provided with a message and a title', () => {
            sut.warning('the-message', 'the-title');

            expect((mockedToastyService.warning as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('the-title');
        });

        it('will be provided with a message but no title, defaulting it to "Warning!"', () => {
            sut.warning('the-message');

            expect((mockedToastyService.warning as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('Warning!');
        });
    });

    describe('When calling the "error" method', () => {
        it('will be provided with a message and a title', () => {
            sut.error('the-message', 'the-title');

            expect((mockedToastyService.error as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('the-title');
        });

        it('will be provided with a message but no title, defaulting it to "Error!"', () => {
            sut.error('the-message');

            expect((mockedToastyService.error as sinon.SinonStub).calledOnce).to.be.true;
            expect((passedOptions as ToastOptions).msg).to.equal('the-message');
            expect((passedOptions as ToastOptions).title).to.equal('Error!');
        });
    });

    it('propagates the "jumped" callback methods when defined', () => {
        sut.jumped = (toast: ToastData) => { /* do nothing */ };

        sut.success('All good in the hood.', 'Ok!');

        expect((passedOptions as ToastOptions).onAdd).to.equal(sut.jumped);
        expect((passedOptions as ToastOptions).onRemove).to.be.null;
    });

    it('propagates the "removed" callback methods when defined', () => {
        sut.removed = (toast: ToastData) => { /* do nothing */ };

        sut.error('All hell breaks loose.', 'Not ok...');

        expect((passedOptions as ToastOptions).onAdd).to.be.null;
        expect((passedOptions as ToastOptions).onRemove).to.equal(sut.removed);
    });
});
