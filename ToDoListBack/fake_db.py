import json


class Database:
    def __init__(self):
        self.data = self.load_from_file()

    def load_from_file(self):
        with open('to_do_list_data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data

    def save_to_file(self):
        with open('to_do_list_data.json', 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False)

    def get_new_id(self):
        new_id = str(max([int(i['id']) for i in self.data]) + 1)
        return new_id

    def add_to_do_task(self, data):
        data.update({"id": self.get_new_id()})
        self.data.append(data)
        self.save_to_file()

    def toggle_task_status(self, id):
        for item in self.data:
            if item["id"] == id:
                if item["done"] == 'False':
                    item["done"] = 'True'
                else:
                    item["done"] = 'False'
        self.save_to_file()

    def get_tasks_list(self):
        self.data = self.load_from_file()
        return self.data

    def edit_task(self, data):
        id = data['id']
        for item in self.data:
            if item["id"] == data['id']:
                item["user_name"] = data["user_name"]
                item["email"] = data["email"]
                item["text"] = data["text"]
                item["done"] = data["done"]
        self.save_to_file()

    def delete_to_do_task(self, id):
        for item in self.data:
            if item["id"] == id:
                self.data.remove(item)
        self.save_to_file()
