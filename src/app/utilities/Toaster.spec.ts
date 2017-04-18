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

    it('calls "default" method with provided message and title', () => {
        sut.default('the-message', 'the-title');

        expect((mockedToastyService.default as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('the-title');
    });

    it('calls "default" method with provided message but default title', () => {
        sut.default('the-message');

        expect((mockedToastyService.default as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('');
    });

    it('calls "info" method with provided message and title', () => {
        sut.info('the-message', 'the-title');

        expect((mockedToastyService.info as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('the-title');
    });

    it('calls "info" method with provided message but default title', () => {
        sut.info('the-message');

        expect((mockedToastyService.info as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('Info');
    });

    it('calls "success" method with provided message and title', () => {
        sut.success('the-message', 'the-title');

        expect((mockedToastyService.success as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('the-title');
    });

    it('calls "success" method with provided message but default title', () => {
        sut.success('the-message');

        expect((mockedToastyService.success as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('Success');
    });

    it('calls "wait" method with provided message and title', () => {
        sut.wait('the-message', 'the-title');

        expect((mockedToastyService.wait as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('the-title');
    });

    it('calls "wait" method with provided message but default title', () => {
        sut.wait('the-message');

        expect((mockedToastyService.wait as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('Please wait...');
    });

    it('calls "warning" method with provided message and title', () => {
        sut.warning('the-message', 'the-title');

        expect((mockedToastyService.warning as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('the-title');
    });

    it('calls "warning" method with provided message but default title', () => {
        sut.warning('the-message');

        expect((mockedToastyService.warning as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('Warning!');
    });

    it('calls "error" method with provided message and title', () => {
        sut.error('the-message', 'the-title');

        expect((mockedToastyService.error as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('the-title');
    });

    it('calls "error" method with provided message but default title', () => {
        sut.error('the-message');

        expect((mockedToastyService.error as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('the-message');
        expect((passedOptions as ToastOptions).title).to.equal('Error!');
    });

    it('calls "default" method with null', () => {
        sut.default(null);

        expect((mockedToastyService.default as sinon.SinonStub).calledOnce).to.be.true;
        expect((passedOptions as ToastOptions).msg).to.equal('');
        expect((passedOptions as ToastOptions).title).to.equal('');
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
