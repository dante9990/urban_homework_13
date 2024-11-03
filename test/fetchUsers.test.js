import { fetchUsers } from "../src/users/users.js";
import { expect } from "chai";
import sinon from "sinon";

describe('Тестирование fetchUsers', function () {
    let sandbox;

    beforeEach(()=>{
        sandbox = sinon.createSandbox();
    })

    afterEach(()=>{
        sandbox.restore()
    })

    it('Тест на полученние данных и вывода их в консоль', async function () {
        const testUsers = [
            {id: 1, name: 'Clint Eastwood'},
            {id: 2, name: 'Silvester Stalone'}
        ];

        global.fetch = sandbox.stub().resolves({
            ok: true,
            json: async () => testUsers
        });

        const consoleLogSpy = sandbox.spy(console, 'log');

        await fetchUsers();

        expect(global.fetch.calledOnce).to.be.true;
        expect(global.fetch.calledWith('https://jsonplaceholder.typicode.com/users')).to.be.true;
        expect(consoleLogSpy.calledWith('Clint Eastwood')).to.be.true;
        expect(consoleLogSpy.calledWith('Silvester Stalone')).to.be.true;
    });

    it('Тест на обработку ошибки при неудачном запросе', async () => {
        global.fetch = sandbox.stub().resolves({
            ok: false,
            status: 404
        });
        try {
            await fetchUsers();
            expect.fail('Функция должна была выбросить ошибку');
        } catch (error) {
            expect(error.message).to.include('Network response was not ok');
        }
    });
});